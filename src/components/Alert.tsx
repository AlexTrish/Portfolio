import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning';

interface AlertProps {
  type: AlertType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
    iconColor: 'text-green-400',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
    iconColor: 'text-red-400',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
    iconColor: 'text-yellow-400',
  },
};

export default function Alert({ 
  type, 
  message, 
  isVisible, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: AlertProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  // Auto close functionality
  if (autoClose && isVisible) {
    setTimeout(() => {
      onClose();
    }, duration);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <div className={`
            ${config.bgColor} ${config.borderColor} ${config.textColor}
            backdrop-blur-sm border rounded-lg p-4 shadow-2xl
            relative overflow-hidden
          `}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                className="w-full h-full bg-gradient-to-r from-transparent via-current to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            </div>

            <div className="relative flex items-start space-x-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={config.iconColor}
              >
                <Icon className="w-5 h-5 mt-0.5" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm leading-relaxed">
                  {message}
                </p>
              </div>

              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Progress bar for auto-close */}
            {autoClose && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-current opacity-30"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}