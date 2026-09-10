import React from 'react';

const WorkflowSection = () => {
  const features = [
    {
      title: "Visual workflow builder",
      description: "Create complex workflows with drag-and-drop simplicity to streamline your operations."
    },
    {
      title: "Extend, don't replace",
      description: "Connect to your existing tools, enhancing your processes without any disruption."
    },
    {
      title: "Powerful interaction suite",
      description: "Build processes with messaging, video calls, document exchange, signatures, and items."
    },
    {
      title: "End the approvals chase",
      description: "Nudge stakeholders to take actions on critical business workflows on mobile and web."
    },
    {
      title: "Template playbooks",
      description: "Save your proven workflow patterns as repeatable playbooks across your organization."
    },
    {
      title: "Role based controls",
      description: "Define who uses and does what across the entire process journey with granular precision."
    }
  ];

  return (
    <section className="py-0 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Automate complex workflows with Our Solution
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;