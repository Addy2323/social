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
  QrCode,
  Copy
} from 'lucide-react';
import FlashMessage from './FlashMessage';

export default function AddFunds() {
  const { user, flashMessage, clearFlashMessage, setFlashMessage } = useAuth();
  const { formatPrice, currency, convertPrice } = useTheme();
  const { addTransaction } = useData();
  const [amount, setAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const quickAmounts = currency === 'USD' ? [10, 25, 50, 100] : [25000, 62500, 125000, 250000];

  const networks = {
    mpesa: { 
      name: 'M-Pesa', 
      code: '*150*00#', 
      color: 'from-green-500 to-green-600',
      steps: ['Piga *150*00#', 'Chagua 1: Lipa kwa M-PESA', 'Weka namba: 0768828247', 'Weka kiasi: {amount}', 'Thibitisha kwa PIN yako'],
      fees: '2%'
    },
    tigo: { 
      name: 'Tigo Pesa', 
      code: '*150*01#', 
      color: 'from-blue-500 to-blue-600',
      steps: ['Piga *150*01#', 'Chagua 1: Lipa Bili', 'Weka namba: 0768828247', 'Weka kiasi: {amount}', 'Thibitisha kwa PIN yako'],
      fees: '2%'
    },
    airtel: { 
      name: 'Airtel Money', 
      code: '*150*60#', 
      color: 'from-red-500 to-red-600',
      steps: ['Piga *150*60#', 'Chagua 1: Send Money', 'Weka namba: 0768828247', 'Weka kiasi: {amount}', 'Thibitisha kwa PIN yako'],
      fees: '2%'
    },
    halopesa: { 
      name: 'HaloPesa', 
      code: '*150*88#', 
      color: 'from-orange-500 to-orange-600',
      steps: ['Piga *150*88#', 'Chagua 1: Send Money', 'Weka namba: 0768828247', 'Weka kiasi: {amount}', 'Thibitisha kwa PIN yako'],
      fees: '2%'
    }
  };

  const validateAmount = (value: string) => {
    if (!value) {
      setAmountError('Amount is required.');
      return false;
    }
    
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      setAmountError('Please enter a valid number greater than 0.');
      return false;
    }
    
    if (value.length > 25) {
      setAmountError('Amount cannot exceed 25 digits.');
      return false;
    }
    
    setAmountError('');
    return true;
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Tanzanian phone number regex: supports 0XXXXXXXXX, +255XXXXXXXXX, 255XXXXXXXXX
    const tzPhoneRegex = /^(\+?255|0)?[67]\d{8}$/;
    
    // Remove any non-digit characters except leading +
    const cleaned = phone.trim();
    
    if (!cleaned) {
      setPhoneError('Phone number is required');
      return false;
    }
    
    // Check if the phone number matches the Tanzanian format
    if (!tzPhoneRegex.test(cleaned)) {
      setPhoneError('Please enter a valid Tanzanian phone number (e.g., 0768828247)');
      return false;
    }
    
    setPhoneError('');
    return true;
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    validateAmount(value);
  };

  const handleAmountSelect = (selectedAmount: number) => {
    const amountStr = selectedAmount.toString();
    setAmount(amountStr);
    validateAmount(amountStr);
  };

  const handlePhoneChange = (value: string) => {
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, '');
    // Format as 0XXXXXXXXX if it starts with 255
    let formatted = cleaned;
    if (cleaned.startsWith('255') && cleaned.length >= 10) {
      formatted = '0' + cleaned.substring(3);
    }
    setPhoneNumber(formatted);
    // Only validate if the field is not empty
    if (formatted) {
      validatePhoneNumber(formatted);
    } else {
      setPhoneError('');
    }
  };

  const copyToClipboard = async (text: string, buttonElement?: HTMLButtonElement) => {
    try {
      await navigator.clipboard.writeText(text);
      if (buttonElement) {
        const originalText = buttonElement.textContent;
        buttonElement.textContent = "Copied ✓";
        setTimeout(() => {
          buttonElement.textContent = originalText;
        }, 1500);
      }
    } catch (err) {
      alert('Unable to copy. Please copy manually: ' + text);
    }
  };

  const copySteps = async (networkId: string, buttonElement: HTMLButtonElement) => {
    if (!validateAmount(amount)) {
      alert('Please enter a valid amount first.');
      return;
    }
    
    const network = networks[networkId as keyof typeof networks];
    const stepsText = network.steps
      .map((step, idx) => `${idx + 1}. ${step.replace('{amount}', amount)}`)
      .join('\n');
    
    await copyToClipboard(stepsText, buttonElement);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isAmountValid = validateAmount(amount);
    const isPhoneValid = validatePhoneNumber(phoneNumber);
    
    if (!amount || !selectedNetwork || !phoneNumber || !user || !isAmountValid || !isPhoneValid) {
      return;
    }
    
    setIsProcessing(true);
    
    const selectedNetworkData = networks[selectedNetwork as keyof typeof networks];
    const transaction = {
      userId: user.id,
      username: user.name,
      amount: Number(amount),
      method: selectedNetworkData?.name || selectedNetwork,
      status: 'pending' as const,
      phone: phoneNumber
    };

    addTransaction(transaction);

    setFlashMessage({ 
      type: 'success', 
      message: `Transaction submitted for ${formatPrice(Number(amount))}. Admin will verify and approve your payment.` 
    });
    
    setIsProcessing(false);
    setAmount('');
    setSelectedNetwork('');
    setPhoneNumber('');
  };

  const calculateFees = () => {
    const network = networks[selectedNetwork as keyof typeof networks];
    if (!network || !amount) return 0;
    
    const numAmount = parseFloat(amount);
    const feePercentage = parseFloat(network.fees.replace('%', '')) / 100;
    return numAmount * feePercentage;
  };

  const getTotalAmount = () => {
    const numAmount = parseFloat(amount) || 0;
    return numAmount + calculateFees();
  };

  const getDialLink = (networkId: string) => {
    const network = networks[networkId as keyof typeof networks];
    return `tel:${network.code.replace('#', '%23')}`;
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
                      onChange={(e) => handleAmountChange(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="1"
                      maxLength={25}
                      className="w-full px-4 py-3 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-300 rounded-lg dark:text-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      required
                    />
                    {amountError && (
                      <p className="text-red-500 text-sm mt-1">{amountError}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-slate-300 text-gray-700 mb-2">
                      Weka namba ya simu
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="e.g., 0768828247, 255768828247"
                      className={`w-full px-4 py-3 dark:bg-slate-700/50 bg-gray-50 border ${phoneError ? 'border-red-500' : 'dark:border-slate-600 border-gray-300'} rounded-lg dark:text-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                      required
                    />
                    {phoneError && (
                      <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                    )}
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

                {/* Mobile Money Networks */}
                <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Select Your Mobile Network
                  </h3>

                  {/* Network Selection */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {Object.entries(networks).map(([networkId, network]) => (
                      <button
                        key={networkId}
                        type="button"
                        onClick={() => setSelectedNetwork(networkId)}
                        className={`p-4 rounded-xl border-2 transition-all text-center bg-gradient-to-r ${network.color} text-white hover:opacity-90 ${
                          selectedNetwork === networkId ? 'ring-2 ring-orange-500 scale-105' : ''
                        }`}
                      >
                        <Phone className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-semibold text-sm">{network.name}</div>
                        <div className="text-xs opacity-90">{network.code}</div>
                      </button>
                    ))}
                  </div>

                  {/* Payment Instructions */}
                  {selectedNetwork && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex gap-3 mb-4">
                        <a
                          href={getDialLink(selectedNetwork)}
                          className={`flex-1 bg-gradient-to-r ${networks[selectedNetwork as keyof typeof networks].color} text-white py-3 px-4 rounded-lg font-semibold transition-all hover:opacity-90 flex items-center justify-center`}
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Open {networks[selectedNetwork as keyof typeof networks].name} · {networks[selectedNetwork as keyof typeof networks].code}
                        </a>
                        <button
                          type="button"
                          onClick={(e) => copySteps(selectedNetwork, e.target as HTMLButtonElement)}
                          className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-all flex items-center"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Steps
                        </button>
                      </div>

                      <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-4">
                        <h4 className="font-semibold dark:text-white text-gray-900 mb-3">
                          {networks[selectedNetwork as keyof typeof networks].name} Payment Steps:
                        </h4>
                        <ol className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="font-bold mr-2">1.</span>
                            <span className="dark:text-slate-300 text-gray-700">
                              Dial <span className="font-bold">{networks[selectedNetwork as keyof typeof networks].code}</span>
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-2">2.</span>
                            <span className="dark:text-slate-300 text-gray-700">
                              Choose <span className="font-bold">
                                {selectedNetwork === 'mpesa' ? '1: Lipa kwa M-PESA' : 
                                 selectedNetwork === 'tigo' ? '1: Lipa Bili' : '1: Send Money'}
                              </span>
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-2">3.</span>
                            <span className="dark:text-slate-300 text-gray-700">
                              Enter number: <span className="font-bold">0768828247</span>
                              <button
                                type="button"
                                onClick={(e) => copyToClipboard('0768828247', e.target as HTMLButtonElement)}
                                className="ml-2 bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded text-xs"
                              >
                                Copy
                              </button>
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-2">4.</span>
                            <span className="dark:text-slate-300 text-gray-700">
                              Enter amount: <span className="font-bold">{amount || '[Enter amount above]'}</span>
                              {amount && (
                                <button
                                  type="button"
                                  onClick={(e) => copyToClipboard(amount, e.target as HTMLButtonElement)}
                                  className="ml-2 bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded text-xs"
                                >
                                  Copy
                                </button>
                              )}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-bold mr-2">5.</span>
                            <span className="dark:text-slate-300 text-gray-700">Confirm with your PIN</span>
                          </li>
                        </ol>

                        <h4 className="font-semibold dark:text-white text-gray-900 mt-4 mb-2">
                          Hatua za {networks[selectedNetwork as keyof typeof networks].name} (Kiswahili):
                        </h4>
                        <ol className="space-y-1 text-sm dark:text-slate-400 text-gray-600">
                          {networks[selectedNetwork as keyof typeof networks].steps.map((step, idx) => (
                            <li key={idx}>{idx + 1}. {step.replace('{amount}', amount || '[kiasi]')}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!amount || !selectedNetwork || !phoneNumber || isProcessing || !!amountError || !!phoneError}
                    className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:cursor-not-allowed flex items-center justify-center"
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

          <p className="text-center text-sm dark:text-slate-400 text-gray-600 mt-6">
            Note: USSD codes work on mobile devices only. On desktop, copy the steps and complete payment from your phone.
          </p>
        </div>
      </div>

      <style jsx={true}>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </Layout>
  );
}
