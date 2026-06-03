'use client';

import React from 'react';
import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/image-sizes';

interface StrategyTechnologyConsultingProps {
  imageSource?: string;
  imageAlt?: string;
  className?: string;
}

const StrategyTechnologyConsulting: React.FC<StrategyTechnologyConsultingProps> = ({
  imageSource = "/agent04.png",
  imageAlt = "Strategy + Technology Consulting illustration",
  className = ""
}) => {
  return (
    <section className={`strategy-consulting-container ${className}`}>
      <div className="strategy-consulting-card">
        {/* Left Side */}
        <div className="left-section">
          {/* Image with shadow */}
          <div className="image-container">
            <div className="image-with-shadow">
              <Image
                src={imageSource}
                alt={imageAlt}
                width={200}
                height={150}
                sizes={IMAGE_SIZES.scsTopImage}
                className="top-image"
              />
              <div className="saucer-shadow"></div>
            </div>
          </div>

          <div className="left-content">
            <h2 className="main-title">Strategy + Technology Consulting</h2>
            <h3 className="subtitle">
              Imodata&apos;s Methodologies to Think + Discover
            </h3>
            <p className="description">
              We help enterprises develop AI/GenAI digital transformation roadmaps and optimize data and technology infrastructures.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line"></div>

        {/* Right Side */}
        <div className="right-section">
          <div className="right-content">
            <div className="content-block">
              <h3 className="block-title">1. Strategy + Feasibility Assessment</h3>
              <div className="bullet-points">
                <div className="bullet-item">
                  <span className="bullet">•</span>
                  <span><strong>Define</strong> business objectives, AI opportunities, use cases, and feasibility.</span>
                </div>
                <div className="bullet-item">
                  <span className="bullet">•</span>
                  <span><strong>Assess</strong> current workflows and AI maturity.</span>
                </div>
                <div className="bullet-item">
                  <span className="bullet">•</span>
                  <span><strong>Analyze</strong> data needs, assess the current data infrastructure, and evaluate the feasibility of delivering data on-demand via a cloud-based service.</span>
                </div>
              </div>
            </div>

            <div className="content-block">
              <h3 className="block-title">2. Future State Vision + Blueprint</h3>
              <div className="bullet-points">
                <div className="bullet-item">
                  <span className="bullet">•</span>
                  <span><strong>Outline</strong> security, compliance, and infrastructure requirements.</span>
                </div>
                <div className="bullet-item">
                  <span className="bullet">•</span>
                  <span><strong>Oversee</strong> a vision workshop to map Agentic AI/Copilot-powered workflows and user interactions.</span>
                </div>
                <div className="bullet-item">
                  <span className="bullet">•</span>
                  <span><strong>Design</strong> data architecture for seamless integration.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategyTechnologyConsulting;
