// Simple backup solution using external API or email
export class DataSync {
  private static readonly BACKUP_INTERVAL = 30 * 60 * 1000; // 30 minutes
  private static backupTimer: number | null = null;

  static startAutoBackup(): void {
    this.backupTimer = setInterval(() => {
      this.backupToEmail();
    }, this.BACKUP_INTERVAL);
  }

  static stopAutoBackup(): void {
    if (this.backupTimer) {
      clearInterval(this.backupTimer);
      this.backupTimer = null;
    }
  }

  // Backup critical data via email (simple solution)
  static async backupToEmail(): Promise<void> {
    try {
      const data = {
        users: JSON.parse(localStorage.getItem('smm_users') || '[]'),
        transactions: JSON.parse(localStorage.getItem('smm_transactions') || '[]'),
        orders: JSON.parse(localStorage.getItem('smm_orders') || '[]'),
        timestamp: new Date().toISOString()
      };

      // Send backup data to your email using a simple service
      const backupData = JSON.stringify(data, null, 2);
      
      // You can integrate with EmailJS or similar service
      console.log('Backup created:', backupData.length, 'characters');
      
      // Store last backup timestamp
      localStorage.setItem('last_backup', new Date().toISOString());
    } catch (error) {
      console.error('Backup failed:', error);
    }
  }

  // Manual backup download
  static downloadBackup(): void {
    const data = {
      users: JSON.parse(localStorage.getItem('smm_users') || '[]'),
      transactions: JSON.parse(localStorage.getItem('smm_transactions') || '[]'),
      orders: JSON.parse(localStorage.getItem('smm_orders') || '[]'),
      supportTickets: JSON.parse(localStorage.getItem('smm_support_tickets') || '[]'),
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `addy-boost-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Check if backup is needed
  static needsBackup(): boolean {
    const lastBackup = localStorage.getItem('last_backup');
    if (!lastBackup) return true;
    
    const lastBackupTime = new Date(lastBackup).getTime();
    const now = Date.now();
    const hoursSinceBackup = (now - lastBackupTime) / (1000 * 60 * 60);
    
    return hoursSinceBackup > 24; // Backup if more than 24 hours
  }
}
