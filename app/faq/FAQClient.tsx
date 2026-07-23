"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";

const videos = [
  {
    title: "Carbon Monoxide Alarms",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084430606?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-02- How to Inspect- Carbon Monoxide Alarms"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Clothes Dryer Exhaust Ventilation",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084430669?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-03-How to Inspect_ Clothes Dryer Exhaust Ventilation"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Doors – Entry",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084430708?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-04- How to Inspect-Doors – Entry"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Doors – Fire-Labeled",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084430785?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-05-How to Inspect_ Doors – Fire-Labeled"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Doors – General",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084430834?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-06-How to Inspect_ Doors – General"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Egress",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084433787?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-07-How to Inspect_ Egress"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Electrical – Conductors, Outlets, and Switches",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084433828?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-08-How to Inspect-Electrical – Conductors, Outlets, and Switches"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Electrical GFCI or AFCI",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084433863?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-09-How to Inspect- Electrical GFCI or AFCI"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Fire Extinguishers",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084433937?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-10-How to Inspect-Fire Extinguishers"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Guardrails",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084433976?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-11-How to Inspect-Guardrails"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Handrails",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084434018?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-12-How to Inspect-Handrails"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "HVAC",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084434060?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-13-How to Inspect-HVAC"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Infestation",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084432352?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-15-How to Inspect-Lighting Auxiliary"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Lighting Auxiliary",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084432374?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-16-How to Inspect-Lighting Exterior"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Lighting Exterior",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084432402?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-17-How to Inspect-Lighting Interior"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Lighting Interior",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084432423?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-18-How to Inspect-Mold-Like Substances"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Mold-Like Substances",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084430538?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-01-How to Inspect-Affirmative Habitability Requirements"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Sinks",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084434100?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-19-How to Inspect-Sinks"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Smoke Alarms",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084432466?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-20-How to Inspect- Smoke Alarms"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Sprinkler Assembly",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084432516?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-21-How to Inspect-Sprinkler Assembly"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  {
    title: "Structural Systems",
    embed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1084432600?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NSPIRE Standards-22-How to Inspect-Structural Systems"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  }
];

export default function FAQClient() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="bg-[#006795] relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F84B5F] rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 text-center">
            <p className="text-[#A8D8EA] font-bold uppercase tracking-[0.2em] mb-4 text-sm">NSPIRE Standards</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
              Education &amp; <span className="text-[#F84B5F] italic font-medium">Training</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-white/80 leading-relaxed font-light">
              Official NSPIRE How-to-Inspect training videos. Click any topic below to watch the inspection guidance video.
            </p>
          </div>
        </section>

        {/* Video Buttons Section */}
        <section className="bg-[#F8F9FA] px-4 md:px-6 py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-14">
              <div className="inline-block mb-6">
                <span className="text-2xl md:text-3xl font-black text-[#006795] uppercase tracking-[0.25em] border-2 border-[#006795] px-8 py-3 rounded-lg block">
                  HOW TO INSPECT
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                NSPIRE Inspection <span className="text-[#F84B5F] italic font-medium">Video Library</span>
              </h2>
              <div className="w-24 h-1.5 bg-[#F84B5F] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {videos.map((video, index) => (
                <button
                  key={index}
                  onClick={() => setActiveVideo(index)}
                  className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left w-full"
                >
                  {/* Play icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-[#006795] rounded-xl flex items-center justify-center group-hover:bg-[#F84B5F] transition-colors duration-300 shadow-lg">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 group-hover:text-[#006795] transition-colors text-sm leading-snug truncate">
                      {video.title}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#F84B5F] flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Video Modal */}
        {activeVideo !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#006795]">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-widest font-bold">NSPIRE · How to Inspect</p>
                  <h3 className="text-white font-bold text-lg">{videos[activeVideo].title}</h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-10 h-10 bg-white/10 hover:bg-[#F84B5F] rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Video Embed */}
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: videos[activeVideo].embed }}
              />
              {/* Navigation */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#0F172A]">
                <button
                  onClick={() => setActiveVideo((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
                  disabled={activeVideo === 0}
                  className="flex items-center gap-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <span className="text-white/40 text-xs">{activeVideo + 1} / {videos.length}</span>
                <button
                  onClick={() => setActiveVideo((prev) => (prev !== null && prev < videos.length - 1 ? prev + 1 : prev))}
                  disabled={activeVideo === videos.length - 1}
                  className="flex items-center gap-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
