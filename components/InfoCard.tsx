"use client";
import React from 'react';

interface InfoCardProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonVariant?: 'primary' | 'secondary';
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonVariant = 'primary',
}) => {
  const buttonClasses =
    buttonVariant === 'primary'
      ? 'bg-custom-accent text-white hover:bg-purple-700'
      : 'bg-white/10 text-white hover:bg-white/20';

  return (
    <div className="bg-custom-card p-6 rounded-lg">
      <h3 className="font-bold text-white">{title}</h3>
      <h4 className="text-md font-semibold text-white mt-1">{subtitle}</h4>
      <p className="text-sm text-custom-text-secondary mt-2">{description}</p>
      <button className={`w-full mt-4 font-semibold py-2 rounded-lg transition ${buttonClasses}`}>
        {buttonText}
      </button>
    </div>
  );
};

export default InfoCard;
