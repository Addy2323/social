import React, { useState } from 'react';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { 
  CreditCard, 
  Wallet, 
  DollarSign, 
  Plus, 
  Check,
  AlertCircle,
  Shield,
  Clock,
  ArrowRight,
  Smartphone,
  Building,
  Globe,
  Phone,
  QrCode
} from 'lucide-react';
import FlashMessage from './FlashMessage';

export default function AddFunds() {
  const { user, flashMessage, clearFlashMessage, setFlashMessage } = useAuth();
  const { formatPrice, currency, convertPrice } = useTheme();
  const { addTransaction } = useData();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const quickAmounts = currency === 'USD' ? [10, 25, 50, 100] : [25000, 62500, 125000, 250000];

  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: Phone,
      description: 'Pay with M-Pesa mobile money',
      color: 'from-green-500 to-green-600',
      available: true,
      fees: '2%'
    },
    {
      id: 'tigopesa',
      name: 'Tigo Pesa',
      icon: Phone,
      description: 'Pay with Tigo Pesa mobile money',
      color: 'from-blue-500 to-blue-600',
      available: true,
      fees: '2%'
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      icon: Phone,
      description: 'Pay with Airtel Money',
      color: 'from-red-500 to-red-600',
      available: true,
      fees: '2%'
    },
    {
      id: 'halopesa',
      name: 'HaloPesa',
      icon: Phone,
      description: 'Pay with HaloPesa',
      color: 'from-orange-500 to-orange-600',
      available: true,
      fees: '2%'
    },
    {
      id: 'tpesa',
      name: 'T-Pesa',
      icon: Phone,
      description: 'Pay with T-Pesa',
      color: 'from-yellow-500 to-yellow-600',
      available: true,
      fees: '2%'
    }
  ];

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !selectedMethod || !phoneNumber || !user) return;

    setIsProcessing(true);
    
    // Create transaction record
    const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);
    const transaction = {
      userId: user.id,
      username: user.name,
      amount: parseFloat(amount),
      method: selectedPaymentMethod?.name || selectedMethod,
      status: 'pending' as const,
      phone: phoneNumber
    };

    addTransaction(transaction);

    setFlashMessage({ 
      type: 'success', 
      message: `Transaction submitted for ${formatPrice(parseFloat(amount))}. Admin will verify and approve your payment.` 
    });
    
    setIsProcessing(false);
    setAmount('');
    setSelectedMethod('');
    setPhoneNumber('');
  };

  const calculateFees = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (!method || !amount) return 0;
    
    const numAmount = parseFloat(amount);
    const feePercentage = parseFloat(method.fees.replace('%', '')) / 100;
    return numAmount * feePercentage;
  };

  const getTotalAmount = () => {
    const numAmount = parseFloat(amount) || 0;
    return numAmount + calculateFees();
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  // USSD codes for different mobile money providers
  const getUSSDCode = (method: string, phone: string, amount: string) => {
    const recipientPhone = '768828247'; // Fixed recipient number
    const formattedAmount = Math.round(parseFloat(amount) || 0).toString();
    
    switch (method) {
      case 'mpesa':
        return `*150*00*01*0${recipientPhone}*${formattedAmount}#`;
      case 'tigopesa':
        return `*150*01*01*0${recipientPhone}*${formattedAmount}#`;
      case 'airtel':
        return `*150*60*01*0${recipientPhone}*${formattedAmount}#`;
      case 'halopesa':
        return `*150*88*01*0${recipientPhone}*${formattedAmount}#`;
      case 'tpesa':
        return `*150*71*01*0${recipientPhone}*${formattedAmount}#`;
      default:
        return '';
    }
  };

  return (
    <Layout>
      <div className="pt-6 px-4 lg:px-6 dark:bg-slate-900 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* WhatsApp Banner */}
          <div className="bg-cyan-500/20 text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-300 p-4 rounded-lg flex justify-between items-center mb-6 border border-cyan-500/30">
            <span>Note: Kama unashindwa kufanya malipo nicheki</span>
            <a 
              href="https://wa.me/+255768828247" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Header */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2 flex items-center">
              <Plus className="w-8 h-8 mr-3 text-orange-500" />
              Add Funds
            </h1>
            <p className="dark:text-slate-400 text-gray-600">
              Top up your account balance to start ordering services
            </p>
          </div>

          {/* Current Balance */}
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-1">Current Balance</h3>
                <div className="text-3xl font-bold dark:text-white text-gray-900">
                  {formatPrice(user?.balance || 0)}
                </div>
              </div>
              <Wallet className="w-12 h-12 text-orange-500" />
            </div>
          </div>

          {flashMessage && (
            <FlashMessage
              type={flashMessage.type}
              message={flashMessage.message}
              onClose={clearFlashMessage}
            />
          )}

          <div className="grid grid-cols-1 gap-8">
            {/* Payment Form */}
            <div className="w-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount Section */}
                <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Amount
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 mb-2">
                      Igiza kiasi cha fedha ({currency})
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="1"
                      className="w-full px-4 py-3 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-300 rounded-lg dark:text-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 mb-2">
                      Weka namba ya simu
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g., 06XXXXXXXX, 07XXXXXXXX, or 255XXXXXXXXX"
                      className="w-full px-4 py-3 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-300 rounded-lg dark:text-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {quickAmounts.map(quickAmount => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => handleAmountSelect(quickAmount)}
                        className="px-4 py-2 dark:bg-slate-700/50 bg-gray-100 hover:bg-orange-500 hover:text-white rounded-lg border dark:border-slate-600 border-gray-300 dark:text-slate-300 text-gray-700 transition-all"
                      >
                        {currency} {quickAmount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </h3>

                  {/* Payment Method Section */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Phone className="w-5 h-5 text-green-500 mr-2" />
                      <h4 className="font-semibold dark:text-white text-gray-900">
                        Choose Your Payment Method
                      </h4>
                    </div>
                    <p className="text-sm dark:text-slate-400 text-gray-600 mb-3">
                      Select your mobile money provider below. After submission, admin will verify your payment.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="text-center">
                          <button
                            type="button"
                            onClick={() => handlePaymentMethodSelect(method.id)}
                            className={`w-full p-3 rounded-lg border-2 transition-all text-center bg-gradient-to-r ${method.color} text-white hover:opacity-90 flex flex-col items-center ${
                              selectedMethod === method.id ? 'ring-2 ring-orange-500' : ''
                            }`}
                          >
                            <method.icon className="w-6 h-6 mb-1" />
                            <span className="text-sm font-medium">{method.name.split(' ')[0]}</span>
                          </button>
                          
                          {selectedMethod === method.id && amount && phoneNumber && (
                            <a
                              href={`tel:${getUSSDCode(method.id, phoneNumber, amount)}`}
                              className="mt-2 block w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-2 px-3 rounded-lg font-semibold transition-all transform hover:scale-105 text-sm"
                            >
                              Pay Now
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  {amount && selectedMethod && (
                    <div className="bg-gradient-to-r from-slate-500/10 to-slate-600/10 border border-slate-500/20 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold dark:text-white text-gray-900 mb-3">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="dark:text-slate-400 text-gray-600">Amount:</span>
                          <span className="dark:text-white text-gray-900">{formatPrice(parseFloat(amount))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="dark:text-slate-400 text-gray-600">Fees:</span>
                          <span className="dark:text-white text-gray-900">{formatPrice(calculateFees())}</span>
                        </div>
                        <div className="border-t dark:border-slate-600 border-gray-300 pt-2">
                          <div className="flex justify-between font-semibold">
                            <span className="dark:text-white text-gray-900">Total:</span>
                            <span className="dark:text-white text-gray-900">{formatPrice(getTotalAmount())}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!amount || !selectedMethod || !phoneNumber || isProcessing}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Transaction
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
