// src/pages/PricingPage/PricingPage.jsx
import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Settings, Sparkles } from 'lucide-react';

const PricingCard = ({ plan, isPopular = false }) => {
  const getIcon = (planName) => {
    switch (planName.toLowerCase()) {
      case 'start': return <Sparkles className="w-7 h-7" />;
      case 'boost': return <Zap className="w-7 h-7" />;
      case 'standard': return <Star className="w-7 h-7" />;
      case 'ultimate': return <Crown className="w-7 h-7" />;
      case 'custom': return <Settings className="w-7 h-7" />;
      default: return <Star className="w-7 h-7" />;
    }
  };

  const getIconColor = (planName) => {
    switch (planName.toLowerCase()) {
      case 'start': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'boost': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
      case 'standard': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'ultimate': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
      case 'custom': return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const getButtonStyle = (planName) => {
    if (planName.toLowerCase() === 'start') {
      return 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:border-gray-600';
    }
    if (planName.toLowerCase() === 'custom') {
      return 'bg-gray-900 hover:bg-gray-800 text-white border-gray-900';
    }
    return 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600';
  };

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-xl border-2 ${
      isPopular 
        ? 'border-blue-500 shadow-xl ring-1 ring-blue-100 dark:ring-blue-900/20' 
        : 'border-gray-200 dark:border-gray-700 shadow-lg'
    } p-8 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600`}>
      
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            ⭐ Recommandé
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-5 ${getIconColor(plan.name)} shadow-sm`}>
          {getIcon(plan.name)}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {plan.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="text-center mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-5xl font-bold text-gray-900 dark:text-white">
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-gray-500 dark:text-gray-400 ml-2 text-lg">
              {plan.period}
            </span>
          )}
        </div>
        {plan.yearlyPrice && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
            {plan.yearlyPrice}
          </p>
        )}
      </div>

      {/* Features */}
      <div className="space-y-4 mb-8 flex-grow">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-5 uppercase tracking-wide">
          Fonctionnalités incluses
        </h4>
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 border-2 hover:transform hover:scale-105 hover:shadow-lg ${getButtonStyle(plan.name)}`}>
        {plan.buttonText}
      </button>
    </div>
  );
};

function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Start',
      description: 'Pour les petites équipes qui débutent',
      price: billingCycle === 'monthly' ? '$0' : '$0',
      period: '/mois',
      yearlyPrice: null,
      buttonText: 'Plan actuel',
      features: [
        '5 Crédits IA/mois',
        '5 Publications par mois',
        '1 compte utilisateur',
        '5 Designs personnalisés',
        'Support par email'
      ]
    },
    {
      name: 'Boost',
      description: 'Pour les équipes en croissance',
      price: billingCycle === 'monthly' ? '$14.99' : '$12.99',
      period: '/mois',
      yearlyPrice: '$155.88 facturé annuellement',
      buttonText: 'Choisir Boost',
      features: [
        '200 Crédits IA/mois',
        '200 Publications par mois',
        '1 compte utilisateur',
        '200 Designs personnalisés',
        '5 Communautés Tailwind',
        'Support prioritaire'
      ]
    },
    {
      name: 'Standard',
      description: 'Notre solution la plus populaire',
      price: billingCycle === 'monthly' ? '$24.99' : '$20.99',
      period: '/mois',
      yearlyPrice: '$251.88 facturé annuellement',
      buttonText: 'Choisir Standard',
      features: [
        '1000 Crédits IA/mois',
        '1000 Publications par mois',
        '2 comptes utilisateurs',
        'Designs illimités',
        'Communautés illimitées',
        'Analytics avancées',
        'Support prioritaire'
      ]
    },
    {
      name: 'Ultimate',
      description: 'Pour les grandes équipes',
      price: billingCycle === 'monthly' ? '$49.99' : '$41.99',
      period: '/mois',
      yearlyPrice: '$503.88 facturé annuellement',
      buttonText: 'Choisir Ultimate',
      features: [
        '2000 Crédits IA/mois',
        'Publications illimitées',
        '3 comptes utilisateurs',
        'Designs illimités',
        'Communautés illimitées',
        'Analytics enterprise',
        'API Access',
        'Support dédié 24/7'
      ]
    },
    {
      name: 'Custom',
      description: 'Solution personnalisée pour l\'entreprise',
      price: 'Sur mesure',
      period: null,
      yearlyPrice: null,
      buttonText: 'Nous contacter',
      features: [
        'Crédits IA personnalisés',
        'Publications illimitées',
        'Utilisateurs illimités',
        'Intégrations personnalisées',
        'SLA garanti',
        'Formation dédiée',
        'Account manager',
        'Support 24/7/365'
      ]
    }
  ];

  // Séparer les plans en deux groupes
  const firstRowPlans = plans.slice(0, 3); // Start, Boost, Standard
  const secondRowPlans = plans.slice(3); // Ultimate, Custom

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Plans et tarifs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Choisissez le plan qui correspond le mieux aux besoins de votre entreprise
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-xl p-1.5 border border-gray-200 dark:border-gray-700 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Facturation mensuelle
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Facturation annuelle
              <span className="ml-3 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                -15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards - Première ligne (3 cartes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {firstRowPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isPopular={plan.name === 'Standard'}
            />
          ))}
        </div>

        {/* Pricing Cards - Deuxième ligne (2 cartes centrées) */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            {secondRowPlans.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;