import React from 'react';
import { useData } from '../../context/DataContext';
import { Mail, ArrowUpRight, Compass, Layers, Globe, MapPin } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { authorProfile, professionalItems } = useData();

  const roles = professionalItems.filter((i) => i.category === 'role');
  const projects = professionalItems.filter((i) => i.category === 'project');
  const exhibitions = professionalItems.filter((i) => i.category === 'exhibition');
  const publications = professionalItems.filter((i) => i.category === 'publication');

  return (
    <div id="about-page-container" className="w-full pb-24">
      {/* Top Banner / Identity Header */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 border-b archival-border">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8C8880] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#171717]"></span>
          <span>RUI / 睿 Ecosystem Profile</span>
          <span className="text-[#C5C2BA]">/</span>
          <span>Index 04</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171717] font-normal tracking-tight">
            About &amp; Practice
          </h1>
          <div className="text-xs font-mono text-[#78756E] space-y-0.5">
            <div>LOCATIONS: {authorProfile.locations.join(' • ')}</div>
            <div>STATUS: ACTIVE INQUIRY &amp; PRACTICE</div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 space-y-24 pt-16">
        {/* Section 1: Personal & Narrative Bio */}
        <section id="about-section-personal" className="space-y-6">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#171717] font-semibold border-b archival-border pb-2">
            <span>01 // Personal Biography</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="font-serif text-2xl text-[#171717] leading-tight">
                {authorProfile.name}
                <span className="font-cjk text-xl text-[#78756E] ml-2">
                  {authorProfile.cjkName}
                </span>
              </div>
              <div className="text-xs font-mono text-[#8C8880] mt-1">
                {authorProfile.title}
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 font-serif text-lg text-[#33312C] leading-relaxed">
              {authorProfile.bioLong.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Philosophy & Intellectual Intent */}
        <section id="about-section-philosophy" className="space-y-8">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#171717] font-semibold border-b archival-border pb-2">
            <span>02 // Artistic &amp; Intellectual Philosophy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {authorProfile.philosophy.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F5] border archival-border p-6 space-y-3"
              >
                <div className="text-xs font-mono text-[#8C8880] uppercase">
                  Principle 0{idx + 1}
                </div>
                <h3 className="font-serif text-xl text-[#171717] font-normal leading-snug">
                  {item.heading}
                </h3>
                {item.subheading && (
                  <div className="text-xs font-mono text-[#78756E] italic">
                    {item.subheading}
                  </div>
                )}
                <div className="space-y-3 font-sans text-xs text-[#52504B] leading-relaxed pt-2 border-t archival-border">
                  {item.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Professional Ecosystem / Résumé */}
        <section id="about-section-professional" className="space-y-12">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#171717] font-semibold border-b archival-border pb-2">
            <span>03 // Professional Practice &amp; Résumé</span>
            <span className="text-[#8C8880] text-[11px] font-normal">
              Equal Conceptual Legitimacy
            </span>
          </div>

          {/* Experience / Positions */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono uppercase text-[#8C8880] tracking-wider">
              Selected Institutional Roles &amp; Appointments
            </h3>
            <div className="divide-y archival-border border-b archival-border">
              {roles.map((role) => (
                <div key={role.id} className="py-6 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs font-mono">
                    <span className="font-bold text-[#171717] text-sm font-sans">
                      {role.title}
                    </span>
                    <span className="text-[#8C8880]">{role.periodOrYear}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-mono text-[#66645E]">
                    <span className="text-[#171717]">{role.organization}</span>
                    {role.location && (
                      <>
                        <span>•</span>
                        <span>{role.location}</span>
                      </>
                    )}
                  </div>
                  <p className="font-sans text-sm text-[#474540] leading-relaxed pt-1">
                    {role.description}
                  </p>
                  {role.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {role.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono bg-[#EFECE6] text-[#52504B] px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Projects & Activations */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono uppercase text-[#8C8880] tracking-wider">
              Selected Architectural &amp; Systems Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 bg-[#FAF9F5] border archival-border space-y-2 group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#8C8880]">
                    <span>{proj.organization}</span>
                    <span>{proj.periodOrYear}</span>
                  </div>
                  <h4 className="font-serif text-lg text-[#171717] font-normal">
                    {proj.link ? (
                      <a href={proj.link} className="hover:underline flex items-center justify-between">
                        <span>{proj.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#8C8880]" />
                      </a>
                    ) : (
                      proj.title
                    )}
                  </h4>
                  <p className="font-sans text-xs text-[#52504B] leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Exhibitions & Monographs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Exhibitions */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase text-[#8C8880] tracking-wider">
                Exhibitions &amp; Installations
              </h3>
              <div className="space-y-4">
                {exhibitions.map((ex) => (
                  <div key={ex.id} className="border-l-2 border-[#171717] pl-3 py-1 space-y-1">
                    <div className="font-serif text-base text-[#171717] font-medium">
                      {ex.title}
                    </div>
                    <div className="text-xs font-mono text-[#78756E]">
                      {ex.organization} • {ex.location} ({ex.periodOrYear})
                    </div>
                    <p className="text-xs font-sans text-[#52504B]">{ex.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase text-[#8C8880] tracking-wider">
                Selected Publications &amp; Monographs
              </h3>
              <div className="space-y-4">
                {publications.map((pub) => (
                  <div key={pub.id} className="border-l-2 border-[#171717] pl-3 py-1 space-y-1">
                    <div className="font-serif text-base text-[#171717] font-medium">
                      {pub.title}
                    </div>
                    <div className="text-xs font-mono text-[#78756E]">
                      {pub.organization} ({pub.periodOrYear})
                    </div>
                    <p className="text-xs font-sans text-[#52504B]">{pub.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Contact & Dialogue */}
        <section id="about-section-contact" className="space-y-6 pt-6 border-t archival-border">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#171717] font-semibold border-b archival-border pb-2">
            <span>04 // Dialogue &amp; Channels</span>
          </div>

          <div className="bg-[#FAF9F5] border archival-border p-6 sm:p-8 space-y-6">
            <p className="font-serif text-lg text-[#33312C] leading-relaxed max-w-2xl">
              For archive inquiries, institutional collaborations, field research access, or
              speaking engagements, direct correspondence to the studio desk:
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t archival-border text-xs font-mono">
              <a
                href={`mailto:${authorProfile.contactEmail}`}
                className="inline-flex items-center space-x-2 text-sm text-[#171717] font-medium hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span>{authorProfile.contactEmail}</span>
              </a>

              <div className="flex flex-wrap gap-4 text-[#66645E]">
                {authorProfile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    className="hover:text-[#171717] hover:underline flex items-center space-x-1"
                  >
                    <span>{s.label}</span>
                    <span>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
