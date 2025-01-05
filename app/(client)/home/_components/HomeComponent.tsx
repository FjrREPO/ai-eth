"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowUpRight,
  Brain,
  ShieldCheck,
  TrendingUp,
  Users,
  Activity,
  Globe
} from 'lucide-react';
import Loader from '@/components/loader/loader';

const Scene3D = dynamic(
  () => import('../../../../components/animations/Etherium3D').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className='relative z-[99] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Loader />
      </div>
    )
  }
);

const initializeGSAP = () => {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
};

export const HomeComponent = () => {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    initializeGSAP();

    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      mainTl
        .from(containerRef.current, {
          opacity: 0,
          duration: 0.8
        })
        .from(headerRef.current?.querySelector('.hero-title') ?? {}, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out'
        })
        .from(headerRef.current?.querySelector('.hero-description') ?? {}, {
          y: 50,
          opacity: 0,
          duration: 1
        }, '-=0.8')
        .from(headerRef.current?.querySelector('.hero-button') ?? {}, {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }, '-=0.6')
        .from('.scene-container', {
          x: 100,
          opacity: 0,
          duration: 1.2
        }, '-=1');

      gsap.to(scrollIndicatorRef.current, {
        y: 20,
        repeat: -1,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true
      });

      const statElements = statsRef.current?.querySelectorAll('.stat-number');
      statElements?.forEach(stat => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
          },
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 0.1 },
          stagger: 0.2,
          onUpdate: function () {
            const current = this.targets()[0];
            current.textContent = current.textContent.includes('ms')
              ? `${Math.round(parseFloat(current.textContent))}ms`
              : current.textContent.includes('M')
                ? `${Math.round(parseFloat(current.textContent))}M+`
                : `${parseFloat(current.textContent).toFixed(1)}%`;
          }
        });
      });

      const cards = cardsRef.current?.children || [];
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.2)'
      });

      const processItems = processRef.current?.querySelectorAll('.process-item');
      processItems?.forEach((item, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top center+=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
          }
        });

        timeline
          .from(item.querySelector('.process-icon'), {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
          })
          .from(item.querySelector('.process-content'), {
            x: 100 * direction,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          }, '-=0.4')
          .from(item.querySelector('.process-image'), {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          }, '-=0.6');
      });

      const testimonialTl = gsap.timeline({
        scrollTrigger: {
          trigger: testimonialRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

      testimonialTl
        .from(testimonialRef.current, {
          y: 50,
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: 'power2.out'
        })
        .from(testimonialRef.current?.querySelectorAll('.testimonial-content > *') || [], {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out'
        }, '-=0.5');

      const ctaElements = ctaRef.current?.children || [];
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

      ctaTl
        .from(ctaElements, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out'
        })
        .from('.cta-button', {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }, '-=0.4');
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Risk Analysis",
      description: "Real-time risk assessment using advanced neural networks and market data"
    },
    {
      icon: TrendingUp,
      title: "Portfolio Optimization",
      description: "Smart portfolio balancing with predictive market analysis"
    },
    {
      icon: ShieldCheck,
      title: "Security Protocols",
      description: "Enhanced security measures with blockchain-based verification"
    }
  ];

  const processSteps = [
    {
      icon: Activity,
      title: "Data Analysis",
      description: "Our AI processes millions of data points in real-time"
    },
    {
      icon: Brain,
      title: "Risk Assessment",
      description: "Advanced algorithms evaluate potential risks and opportunities"
    },
    {
      icon: Globe,
      title: "Market Integration",
      description: "Seamless integration with global markets and exchanges"
    }
  ];

  const MainContent = () => (
    <div ref={containerRef} className="min-h-screen relative">
      <div ref={headerRef} className="relative min-h-[70vw]">
        <div className="flex flex-col lg:flex-row items-center relative px-4 lg:px-8 py-12 lg:py-24">
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
              <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 leading-tight">
                AI-Powered Risk Profiling
              </h1>
              <p className="hero-description text-lg md:text-xl text-gray-300">
                Advanced machine learning algorithms for precise DeFi risk calculation and portfolio optimization
              </p>
              <Button className="hero-button bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-4 md:px-8 md:py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </div>
          </div>
          <div className="scene-container h-[400px] md:h-[600px] lg:h-[800px] w-full lg:w-1/2">
            {isClient && <Scene3D />}
          </div>
        </div>
      </div>

      <div ref={statsRef} className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 py-12 md:py-24 px-4">
        {[
          { value: "99.8", suffix: "%", label: "Prediction Accuracy" },
          { value: "50", suffix: "ms", label: "Response Time" },
          { value: "1", suffix: "M+", label: "Analyzed Transactions" }
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative text-center p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <p className="stat-number text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value + stat.suffix}
              </p>
              <p className="text-gray-300 mt-2">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div ref={cardsRef} className="container mx-auto py-12 md:py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <Card className="relative h-full p-6 md:p-8 bg-gray-800/40 backdrop-blur border-white/10 rounded-2xl transition-all duration-300 group-hover:scale-105">
                <feature.icon className="w-12 h-12 text-indigo-400 mb-6" />
                <h3 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {feature.description}
                </p>
                <Button variant="outline" className="group/button border-indigo-400/50 hover:bg-indigo-400/10">
                  Explore
                  <ArrowUpRight className="ml-2 group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform" />
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div ref={processRef} className="container mx-auto py-12 md:py-24 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="space-y-16 md:space-y-24">
          {processSteps.map((step, index) => (
            <div key={index} className="process-item flex flex-col md:flex-row items-center gap-8">
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="process-content space-y-4">
                  <div className="process-icon">
                    <step.icon className="w-12 h-12 md:w-16 md:h-16 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
              <div className={`w-full md:w-1/2 process-image ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
                  <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={testimonialRef} className="container mx-auto py-12 md:py-24 px-4" >
        <Card className="relative p-8 md:p-12 bg-gray-800/40 backdrop-blur border-white/10 rounded-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5" />
          <div className="testimonial-content max-w-3xl mx-auto text-center relative">
            <Users className="w-12 h-12 md:w-16 md:h-16 text-indigo-400 mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              &quot;This platform has revolutionized how we approach risk assessment in DeFi. The AI-powered insights have been invaluable for our portfolio management.&quot;
            </p>
            <div className="space-y-2">
              <div className="font-bold text-xl md:text-2xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Bapak Fajar
              </div>
              <div className="text-gray-400">Chief Investment Officer, DeFi Capital</div>
            </div>
          </div>
        </Card>
      </div>

      <div ref={ctaRef} className="container mx-auto py-12 md:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Transform Your Portfolio?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of investors who are already leveraging AI for smarter investment decisions
          </p>
          <Button className="cta-button bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl rounded-xl transition-all duration-300 hover:scale-105">
            Get Started Now
            <ArrowUpRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </div>

      <footer className="border-t border-white/10 mt-12 md:mt-24">
        <div className="container mx-auto py-8 md:py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Company</h3>
              <ul className="space-y-2">
                {['About', 'Careers', 'Contact', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Security', 'API'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Resources</h3>
              <ul className="space-y-2">
                {['Documentation', 'Guides', 'Support', 'Status'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Legal</h3>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'License', 'Cookies'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AI Risk Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  return <MainContent />;
};

export default HomeComponent;