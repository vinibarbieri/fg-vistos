import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FeaturesProps {
  features: {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
    image: string;
  }[];
  primaryColor?: string;
  progressGradientLight?: string;
  progressGradientDark?: string;
  onFeatureChange?: (index: number) => void;
}

export function Features({
  features,
  onFeatureChange,
}: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();

      container.scrollTo({
        left:
          activeFeatureElement.offsetLeft -
          (containerRect.width - elementRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [currentFeature]);

  useEffect(() => {
    if (onFeatureChange) {
      onFeatureChange(currentFeature);
    }
  }, [currentFeature, onFeatureChange]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Selecione o serviço que você precisa
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mt-4 mb-6">
            Soluções Completas para Sua Viagem
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-16 gap-8 items-start">
          {/* Left Side - Features with Progress Lines */}
          <div
            ref={containerRef}
            className="space-y-4 lg:space-y-8 overflow-x-auto overflow-hidden no-scrollbar lg:overflow-visible flex flex-col order-1 scroll-smooth"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="relative cursor-pointer flex-shrink-0"
                  onClick={() => handleFeatureClick(index)}
                >
                  {/* Feature Content */}
                  <div
                    className={`
                    flex flex-row items-start space-x-4 p-3 w-full max-w-md md:max-w-lg lg:max-w-2xl transition-all duration-300
                    ${
                      isActive
                        ? "bg-white dark:bg-black/80 shadow-xl dark:drop-shadow-lg rounded-xl border dark:border-none border-gray-200"
                        : ""
                    }
                  `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                      p-3 rounded-full transition-all duration-300
                      ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-primary/10 dark:bg-black/80 text-primary"
                      }
                    `}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className={`
                        text-lg font-semibold mb-2 transition-colors duration-300
                        ${
                          isActive
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-white/80"
                        }
                      `}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`
                        transition-colors duration-300 text-sm
                        ${
                          isActive
                            ? "text-gray-600 dark:text-white/60"
                            : "text-gray-500 dark:text-white/40"
                        }
                      `}
                      >
                        {feature.description}
                      </p>
                      <div className="mt-4 bg-white dark:bg-black/80 rounded-sm h-1 overflow-hidden">
                        {isActive && (
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: 0 }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Image Display */}
          <div className="relative order-1 max-w-lg mx-auto lg:order-2 hidden lg:block">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <img
                className="rounded-2xl border dark:border-none border-gray-50 shadow-lg dark:drop-shadow-lg w-full h-auto"
                src={features[currentFeature].image}
                alt={features[currentFeature].title}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}