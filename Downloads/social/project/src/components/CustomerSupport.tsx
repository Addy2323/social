import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  User, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Headphones,
  Shield,
  Zap
} from 'lucide-react';
import FlashMessage from './FlashMessage';

interface SupportTicket {
  id: string;
  userId: string;
  username: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  date: string;
  adminResponse?: string;
  respondedBy?: string;
  responseDate?: string;
}

export default function CustomerSupport() {
  const { user } = useAuth();
  const { formatPrice } = useTheme();
  const { addSupportTicket, getSupportTicketsByUserId } = useData();
  const [activeTab, setActiveTab] = useState<'contact' | 'chat' | 'faq' | 'tickets'>('contact');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [flashMessage, setFlashMessage] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'support',
      message: 'Hello! How can I help you today?',
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const faqs = [
    {
      question: 'How do I add funds to my account?',
      answer: 'You can add funds by going to the "Add Funds" page and selecting your preferred payment method. We support M-Pesa, Tigo Pesa, Airtel Money, and other local payment options.'
    },
    {
      question: 'How long does it take for orders to be completed?',
      answer: 'Most orders are processed within 24-48 hours after admin approval. Delivery time depends on the service type and quantity ordered.'
    },
    {
      question: 'What happens if my order is cancelled?',
      answer: 'If your order is cancelled by an admin, the full amount will be automatically refunded to your account balance.'
    },
    {
      question: 'Are the followers/likes real?',
      answer: 'Yes, we provide high-quality engagement from real accounts. All our services comply with platform guidelines.'
    },
    {
      question: 'Can I track my order progress?',
      answer: 'Yes, you can track all your orders from your dashboard. You\'ll see real-time status updates as your order progresses.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept M-Pesa, Tigo Pesa, Airtel Money, HaloPesa, T-Pesa, credit cards, bank transfers, and PayPal.'
    }
  ];

  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  useEffect(() => {
    if (user) {
      const userTickets = getSupportTicketsByUserId(user.id);
      setTickets(userTickets);
    }
  }, [user, getSupportTicketsByUserId]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setFlashMessage({ type: 'error', message: 'Please log in to submit a support ticket.' });
      return;
    }

    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      setFlashMessage({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    addSupportTicket({
      userId: user.id,
      username: user.name,
      subject: contactForm.subject,
      message: contactForm.message,
      priority: contactForm.priority,
      status: 'open'
    });

    setFlashMessage({ type: 'success', message: 'Support ticket submitted successfully! We\'ll get back to you soon.' });
    setContactForm({ subject: '', message: '', priority: 'medium' });
    
    // Refresh tickets after submission
    if (user) {
      setActiveTab('tickets');
    }
  };

  const handleChatSend = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      time: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate support response
    setTimeout(() => {
      const supportResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        message: 'Thank you for your message. A support agent will respond shortly.',
        time: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, supportResponse]);
    }, 1000);
  };

  const clearFlashMessage = () => setFlashMessage(null);

  return (
    <Layout>
      <div className="pt-6 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
              Customer Support
            </h1>
            <p className="dark:text-slate-400 text-gray-600">
              Get help with your account, orders, and services
            </p>
          </div>

          {flashMessage && (
            <FlashMessage
              type={flashMessage.type}
              message={flashMessage.message}
              onClose={clearFlashMessage}
            />
          )}

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold dark:text-white text-gray-900 mb-2">Phone Support</h3>
              <p className="dark:text-slate-400 text-gray-600 text-sm mb-3">
                Call us for immediate assistance
              </p>
              <p className="dark:text-white text-gray-900 font-medium">+255 768 828 247</p>
              <p className="dark:text-slate-400 text-gray-600 text-xs">24/7 Available</p>
            </div>

            <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold dark:text-white text-gray-900 mb-2">Email Support</h3>
              <p className="dark:text-slate-400 text-gray-600 text-sm mb-3">
                Send us detailed inquiries
              </p>
              <p className="dark:text-white text-gray-900 font-medium">myambaado@gmail.com</p>
              <p className="dark:text-slate-400 text-gray-600 text-xs">Response within 2 hours</p>
            </div>

            <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold dark:text-white text-gray-900 mb-2">Live Chat</h3>
              <p className="dark:text-slate-400 text-gray-600 text-sm mb-3">
                Chat with our support team
              </p>
              <button
                onClick={() => setActiveTab('chat')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                Start Chat
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'contact'
                  ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Contact Form
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Live Chat
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'tickets'
                  ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              My Tickets
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'faq'
                  ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              FAQ
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'contact' && (
            <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 p-6 shadow-lg">
              <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-6">Submit a Support Ticket</h2>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium dark:text-white text-gray-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-200 rounded-lg dark:text-white text-gray-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-white text-gray-900 mb-2">
                    Priority
                  </label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                    className="w-full px-4 py-3 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-200 rounded-lg dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-white text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-200 rounded-lg dark:text-white text-gray-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe your issue in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-6 rounded-lg transition-all"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 shadow-lg">
              <div className="p-4 border-b dark:border-slate-700 border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white text-gray-900">Support Agent</h3>
                    <p className="text-sm dark:text-slate-400 text-gray-600">Online</p>
                  </div>
                </div>
              </div>

              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                          : 'dark:bg-slate-700 bg-gray-100 dark:text-white text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-orange-100' : 'dark:text-slate-400 text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t dark:border-slate-700 border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    className="flex-1 px-4 py-2 dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600 border-gray-200 rounded-lg dark:text-white text-gray-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Type your message..."
                  />
                  <button
                    onClick={handleChatSend}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-2 rounded-lg transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-6">My Support Tickets</h2>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 shadow-lg"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold dark:text-white text-gray-900 mb-2">{ticket.subject}</h3>
                          <p className="text-sm dark:text-slate-400 text-gray-600">
                            Submitted on {new Date(ticket.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          }`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            ticket.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            ticket.priority === 'medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}>
                            {ticket.priority} priority
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium dark:text-slate-300 text-gray-700 mb-2">Your Message:</p>
                        <div className="bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3">
                          <p className="dark:text-slate-300 text-gray-700">{ticket.message}</p>
                        </div>
                      </div>

                      {ticket.adminResponse && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
                          <div className="flex items-center mb-2">
                            <Headphones className="w-4 h-4 text-blue-500 mr-2" />
                            <p className="text-sm font-medium dark:text-blue-300 text-blue-800">Admin Response</p>
                          </div>
                          <p className="dark:text-blue-200 text-blue-700 mb-2">{ticket.adminResponse}</p>
                          <p className="text-xs dark:text-blue-400 text-blue-600">
                            Responded by {ticket.respondedBy} on {ticket.responseDate ? new Date(ticket.responseDate).toLocaleDateString() : ''}
                          </p>
                        </div>
                      )}

                      {!ticket.adminResponse && ticket.status !== 'resolved' && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-3 rounded-r-lg">
                          <p className="text-sm dark:text-yellow-300 text-yellow-800">
                            {ticket.status === 'open' ? 'Your ticket is waiting for admin review.' : 'Your ticket is being processed by our support team.'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 dark:text-slate-400 text-gray-400" />
                  <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">No Support Tickets</h3>
                  <p className="dark:text-slate-400 text-gray-600 mb-4">
                    You haven't submitted any support tickets yet.
                  </p>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
                  >
                    Submit Your First Ticket
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-6">Frequently Asked Questions</h2>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="dark:bg-slate-800/50 bg-white rounded-xl border dark:border-slate-700 border-gray-200 shadow-lg"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:dark:bg-slate-700/30 hover:bg-gray-50 transition-all"
                  >
                    <h3 className="font-semibold dark:text-white text-gray-900">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 dark:text-slate-400 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 dark:text-slate-400 text-gray-600" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="dark:text-slate-300 text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
