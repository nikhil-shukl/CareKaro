import React from "react";
import { useNavigate } from "react-router-dom";
import { featuresData } from "../assets/featuresData";
import { Stethoscope, FileText, BookOpen, MessageSquare, Megaphone, MapPin } from "lucide-react";

const iconMap = { Stethoscope, FileText, BookOpen, MessageSquare, Megaphone, MapPin };

const Features = () => {
  const navigate = useNavigate();

  const handleCardClick = (feature) => {
    navigate(feature.route); // just navigate to the route
  };

  return (
    <section id="features" className="py-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to manage your care
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => {
            const Icon = iconMap[feature.iconName];
            return (
              <div
                key={index}
                onClick={() => handleCardClick(feature)}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col items-start space-y-4"
              >
                {Icon && <Icon className="h-8 w-8 text-blue-600" />}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
