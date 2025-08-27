export interface BackupData {
  users: any[];
  transactions: any[];
  orders: any[];
  supportTickets: any[];
  timestamp: string;
  version: string;
}

export class DataBackup {
  static exportData(): BackupData {
    const users = JSON.parse(localStorage.getItem('smm_users') || '[]');
    const transactions = JSON.parse(localStorage.getItem('smm_transactions') || '[]');
    const orders = JSON.parse(localStorage.getItem('smm_orders') || '[]');
    const supportTickets = JSON.parse(localStorage.getItem('smm_support_tickets') || '[]');

    return {
      users,
      transactions,
      orders,
      supportTickets,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };
  }

  static downloadBackup(): void {
    const data = this.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `smm-panel-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static importData(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data: BackupData = JSON.parse(e.target?.result as string);
          
          // Validate backup structure
          if (!data.users || !data.transactions || !data.orders || !data.supportTickets) {
            throw new Error('Invalid backup file structure');
          }

          // Import data
          localStorage.setItem('smm_users', JSON.stringify(data.users));
          localStorage.setItem('smm_transactions', JSON.stringify(data.transactions));
          localStorage.setItem('smm_orders', JSON.stringify(data.orders));
          localStorage.setItem('smm_support_tickets', JSON.stringify(data.supportTickets));
          
          resolve(true);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }

  static scheduleAutoBackup(): void {
    // Auto backup every 24 hours
    setInterval(() => {
      const data = this.exportData();
      localStorage.setItem('smm_auto_backup', JSON.stringify(data));
    }, 24 * 60 * 60 * 1000);
  }
}
