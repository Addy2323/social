export interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info';
  message: string;
  stack?: string;
  userId?: string;
  action?: string;
  data?: any;
}

export class ErrorHandler {
  private static logs: ErrorLog[] = [];

  static logError(error: Error, userId?: string, action?: string, data?: any): void {
    const errorLog: ErrorLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      level: 'error',
      message: error.message,
      stack: error.stack,
      userId,
      action,
      data
    };

    this.logs.push(errorLog);
    this.persistLogs();
    
    // In production, send to monitoring service
    if (import.meta.env.PROD) {
      this.sendToMonitoring(errorLog);
    }
  }

  static logWarning(message: string, userId?: string, action?: string): void {
    const warningLog: ErrorLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      level: 'warning',
      message,
      userId,
      action
    };

    this.logs.push(warningLog);
    this.persistLogs();
  }

  static handleAsyncError<T>(
    promise: Promise<T>,
    fallback?: T,
    userId?: string,
    action?: string
  ): Promise<T | undefined> {
    return promise.catch((error) => {
      this.logError(error, userId, action);
      return fallback;
    });
  }

  static validateInput(input: any, rules: ValidationRule[]): ValidationResult {
    const errors: string[] = [];

    for (const rule of rules) {
      if (!rule.validator(input)) {
        errors.push(rule.message);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static persistLogs(): void {
    try {
      localStorage.setItem('smm_error_logs', JSON.stringify(this.logs.slice(-100))); // Keep last 100 logs
    } catch (error) {
      console.error('Failed to persist error logs:', error);
    }
  }

  private static sendToMonitoring(log: ErrorLog): void {
    // Implement your monitoring service integration here
    // Example: Sentry, LogRocket, etc.
    console.error('Production Error:', log);
  }

  static getLogs(): ErrorLog[] {
    return this.logs;
  }

  static clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('smm_error_logs');
  }
}

export interface ValidationRule {
  validator: (input: any) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Common validation rules
export const ValidationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validator: (input) => input !== null && input !== undefined && input !== '',
    message
  }),

  email: (message = 'Invalid email format'): ValidationRule => ({
    validator: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input),
    message
  }),

  phone: (message = 'Invalid phone number'): ValidationRule => ({
    validator: (input) => /^(\+255|0)[67]\d{8}$/.test(input),
    message
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    validator: (input) => input && input.length >= min,
    message: message || `Minimum length is ${min} characters`
  }),

  positiveNumber: (message = 'Must be a positive number'): ValidationRule => ({
    validator: (input) => !isNaN(input) && parseFloat(input) > 0,
    message
  })
};
