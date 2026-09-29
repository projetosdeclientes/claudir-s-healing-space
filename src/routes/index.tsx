import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Activity, ArrowDown, ArrowUpRight, BadgeCheck, Brain, Check, CircleHelp, Clock3, Cloud, Heart, HeartHandshake, LockKeyhole, MoveUpRight, Play, Quote, ShieldCheck, Sparkles, Star, UserRound, UsersRound, Waves, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import logoNavbar from "@/assets/logo-abraph-navbar.png.asset.json";
import logoSelo from "@/assets/logo-abraph-selo.png.asset.json";
import heroCoast from "@/assets/hero-coast.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Claudir J. Corrêa — Terapeuta Integrativo | Atendimento on-line" },
      { name: "description", content: "Sou terapeuta integrativo com atuação desde 2007. Atendimento individual 100% on-line com TRG como abordagem principal. Conheça meus serviços e converse pelo WhatsApp." },
      { property: "og:title", content: "Claudir J. Corrêa — Terapeuta Integrativo" },
      { property: "og:description", content: "Meu espaço de escuta e cuidado, no seu tempo. Atendimento individual 100% on-line." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const pains = [
  { icon: Activity, title: "Ansiedade", text: "Aquela sensação de alerta constante, difícil de desligar." },
  { icon: Waves, title: "Sobrecarga emocional", text: "Como se tudo pedisse resposta ao mesmo tempo." },
  { icon: ShieldCheck, title: "Medos", text: "Preocupações que antecipam o pior antes mesmo de acontecer." },
  { icon: Sparkles, title: "Inseguranças", text: "Dúvidas que travam decisões simples do dia a dia." },
  { icon: Heart, title: "Autoestima", text: "A sensação de nunca estar bom o suficiente." },
  { icon: UsersRound, title: "Dificuldades nos relacionamentos", text: "Sentir que não está sendo compreendido(a), ou ter dificuldade para se expressar." },
];

const faq = [
  ["As sessões são realmente por vídeo, com a mesma qualidade de um atendimento presencial?", "Sim. As sessões acontecem por videochamada, num ambiente privado, com a mesma atenção e cuidado de um atendimento presencial. Você só precisa de um lugar tranquilo e conexão com a internet."],
  ["Quanto tempo dura cada sessão?", "Cada sessão tem aproximadamente 60 minutos, tempo suficiente para você se expressar com calma, sem pressa pra encerrar."],
  ["Como funciona a TRG, a abordagem que você utiliza?", "A TRG (Terapia de Reprocessamento Generativo) é minha principal abordagem. Ela não segue fórmulas prontas, cada sessão é conduzida respeitando o tempo e a história de quem está ali, sem julgamentos."],
  ["Como faço pra agendar minha primeira sessão?", "É simples: chama no WhatsApp, a gente conversa rapidinho sobre o que você está buscando e já encontramos juntos o melhor horário pra você começar."],
  ["Quanto custa o atendimento?", "A sessão individual é R$ 200. Se você já sabe que quer se dedicar a um processo mais contínuo, o Programa Reequilíbrio Emocional (8 sessões) sai por R$ 1.360. Qualquer dúvida, é só chamar no WhatsApp."],
];

function SectionHeading({ eyebrow, title, description, centered = false }: { eyebrow?: string; title: string; description?: string; centered?: boolean }) {
  return <div className={`section-heading ${centered ? "section-heading--center" : ""}`}>
    {eyebrow && <span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span>}
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
}

function RevealWrapper({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "reveal--visible" : ""} reveal-delay-${Math.min(Math.max(delay, 1), 7)} ${className}`}>{children}</div>;
}

function HomePage() {
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("inicio");
      setShowNav(window.scrollY > (hero?.offsetHeight ?? 700) * 0.66);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return <main>
    <header className={`floating-nav ${showNav ? "floating-nav--visible" : ""}`} aria-hidden={!showNav}>
      <div className="container nav-inner">
        <a className="nav-brand" href="#inicio" tabIndex={showNav ? 0 : -1} aria-label="Claudir J. Corrêa — voltar ao início">
          <img src={logoNavbar.url} width="56" height="43" alt="Selo ABRAPH" />
          <span><strong>Claudir J. Corrêa</strong><small>Terapeuta Integrativo</small></span>
        </a>
        <WhatsAppLink className="nav-cta" message="Olá, Claudir! Gostaria de conversar sobre o atendimento.">WhatsApp</WhatsAppLink>
      </div>
    </header>

    <section id="inicio" className="hero">
      <img className="hero-image" src={heroCoast} width={1536} height={1024} alt="Mar tranquilo ao amanhecer" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="container hero-inner">
        <div className="hero-top"><span className="hero-monogram">C<span className="hero-monogram-dot">·</span>J<span className="hero-monogram-dot">·</span>C</span><span className="hero-top-name">CLAUDIR J. CORRÊA <span> / </span> TERAPEUTA INTEGRATIVO</span></div>
        <div className="hero-content">
          <span className="hero-tag"><span className="live-dot" /> Atendimento 100% on-line</span>
          <h1>Ansiedade, estresse ou a sensação de que os pensamentos não param?</h1>
          <p>Você não precisa continuar carregando isso sozinho. Se a sensação de sobrecarga, medo ou insegurança tem tomado mais espaço do que você gostaria, saiba que existe um caminho para respirar com mais leveza. Aqui você encontra um espaço de escuta verdadeira, sem pressa e sem julgamento, para colocar em palavras o que sente e começar, no seu tempo, a cuidar de você.</p>
          <WhatsAppLink variant="light" arrow className="hero-cta" message="Olá, Claudir! Gostaria de conversar sobre o atendimento on-line.">Falar agora no WhatsApp</WhatsAppLink>
          <div className="hero-trust" aria-label="Informações sobre o atendimento">
            <span><Clock3 size={16} /> Atuação desde 2007</span><span><Brain size={16} /> TRG como abordagem principal</span><span><BadgeCheck size={16} /> Registro ABRAPH 07853AB</span>
          </div>
        </div>
        <a className="hero-scroll" href="#identificacao" aria-label="Ir para a próxima seção"><span>EXPLORE A PÁGINA</span><ArrowDown size={16} /></a>
      </div>
    </section>

    <section id="identificacao" className="section pain-section">
      <div className="container">
        <RevealWrapper delay={1}>
          <div className="pain-header"><SectionHeading eyebrow="Identificação" title="Isso tem soado familiar pra você?" description="Cada pessoa vive isso de um jeito. Talvez você se reconheça em uma ou mais dessas situações:" /><div className="header-ornament" aria-hidden="true"><span>01</span><i /></div></div>
        </RevealWrapper>
        <RevealWrapper delay={2}>
          <div className="pain-grid">{pains.map(({ icon: Icon, title, text }, index) => <article className="pain-card" key={title}><div className="pain-card-top"><span className="icon-box"><Icon size={25} strokeWidth={1.65} /></span><span className="card-number">0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </RevealWrapper>
        <RevealWrapper delay={3}>
          <p style={{ textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '.95rem', marginTop: '24px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>Você não precisa se encaixar em todos esses pontos pra fazer sentido buscar ajuda. Às vezes, um já é suficiente.</p>
        </RevealWrapper>
      </div>
    </section>

    <section className="change-section"><RevealWrapper delay={1}><div className="container change-inner"><span className="change-symbol" aria-hidden="true"><HeartHandshake size={30} strokeWidth={1.35} /></span><p>Existe um caminho entre onde você está agora e um jeito mais leve de viver, mesmo que hoje pareça distante. Você não precisa ter todas as respostas, nem chegar "pronto" para começar. Terapia não é acender uma luz que apaga tudo de uma vez, é começar a enxergar melhor, um passo de cada vez. Você só precisa de um espaço onde possa ser ouvido de verdade, e dar esse primeiro passo, no seu tempo.</p><span className="change-deco" aria-hidden="true">✳</span></div></RevealWrapper></section>

    <section id="ajuda" className="section help-section"><div className="container help-grid"><RevealWrapper delay={1}><div className="help-art" aria-hidden="true"><div className="help-art-inner"><span className="help-art-ring help-art-ring-one" /><span className="help-art-ring help-art-ring-two" /><span className="help-art-center"><Heart size={72} strokeWidth={0.75} /></span><span className="help-art-small help-art-small-one"><Waves size={23} /></span><span className="help-art-small help-art-small-two"><Sparkles size={21} /></span></div><span className="help-art-caption">ESCUTA · RESPEITO · ACOLHIMENTO</span></div></RevealWrapper><RevealWrapper delay={2}><div className="help-copy"><SectionHeading eyebrow="Como posso ajudar" title="Um espaço de escuta, no seu tempo" description="Trabalho com adultos que enfrentam ansiedade, estresse, sobrecarga emocional, medos, inseguranças e baixa autoestima. Minha principal abordagem é a TRG (Terapia de Reprocessamento Generativo), que ajuda a olhar essas questões de um jeito mais leve e prático, respeitando a história e o tempo de cada pessoa." /><p style={{ marginTop: '24px', marginBottom: '16px', fontWeight: 600, color: 'var(--foreground)' }}>O que pode mudar ao longo do processo</p><ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gap: '10px' }}><li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '.9rem' }}><Check size={16} color="var(--sage)" />Mais clareza sobre os próprios sentimentos e reações</li><li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '.9rem' }}><Check size={16} color="var(--sage)" />Mais equilíbrio emocional no dia a dia</li><li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '.9rem' }}><Check size={16} color="var(--sage)" />Relações mais leves e verdadeiras</li><li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '.9rem' }}><Check size={16} color="var(--sage)" />Mais confiança para lidar com decisões e desafios</li></ul><ul className="check-list"><li><Check size={16} />TRG como abordagem principal, sem fórmulas prontas</li><li><Check size={16} />Escuta respeitosa, no tempo de cada pessoa</li><li><Check size={16} />Espaço privado e sem julgamentos</li></ul><WhatsAppLink variant="outline" arrow message="Olá, Claudir! Quero entender melhor como funciona seu atendimento com TRG.">Quero entender melhor</WhatsAppLink></div></RevealWrapper></div></section>

    <section id="funciona" className="section process-section"><div className="container"><RevealWrapper delay={1}><SectionHeading eyebrow="Como funciona" title="O atendimento, de forma simples" centered /></RevealWrapper><RevealWrapper delay={2}><div className="steps"><div className="steps-line" aria-hidden="true" />{[{ icon: UserRound, title: "Individual", text: "Sessões um a um, com total atenção só para você." }, { icon: Cloud, title: "100% on-line", text: "De onde você estiver, sem deslocamento nem espera." }, { icon: Clock3, title: "~60 minutos", text: "Tempo suficiente para se expressar com calma." }, { icon: Brain, title: "TRG", text: "Abordagem principal, aplicada de forma leve e respeitosa." }].map(({ icon: Icon, title, text }, i) => <div className="step" key={title}><span className="step-icon"><Icon size={27} strokeWidth={1.55} /></span><span className="step-count">0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></RevealWrapper></div></section>

    <section id="sobre" className="section about-section"><div className="container about-grid"><RevealWrapper delay={1}><div className="portrait-placeholder" role="img" aria-label="Espaço reservado para a foto de Claudir J. Corrêa"><div className="portrait-frame"><UserRound size={75} strokeWidth={0.75} /><span>FOTO DE CLAUDIR<br />EM BREVE</span></div><span className="portrait-corner" /></div></RevealWrapper><RevealWrapper delay={2}><div className="about-copy"><SectionHeading eyebrow="Sobre mim" title="Claudir J. Corrêa" description="Sou Claudir J. Corrêa, Terapeuta Integrativo, com atuação na área terapêutica desde 2007. Acredito que cada pessoa tem uma história única, por isso ofereço um espaço de escuta, respeito e acolhimento, considerando o momento e as necessidades de cada pessoa. O atendimento é realizado 100% on-line, de forma individualizada e com privacidade." /><div className="about-divider" /><p className="mini-label">FORMAÇÃO E CONHECIMENTOS</p><div className="formation-pills"><span className="formation-primary">TRG (abordagem principal)</span><span>Reiki</span><span>PNL</span><span>Hipnose</span><span>Inteligência Emocional</span></div><div className="credential"><img src={logoSelo.url} width="92" height="74" alt="Selo ABRAPH terapeuta credenciado 07853AB" /><span><strong>ABRAPH Credenciado</strong><small>Registro 07853AB</small></span><BadgeCheck size={21} aria-hidden="true" /></div></div></RevealWrapper></div></section>

    <section id="video" className="section video-section"><div className="container video-layout"><RevealWrapper delay={1}><div><SectionHeading eyebrow="Apresentação" title="Um pouco sobre o meu trabalho" /><p className="video-support">Uma conversa mais de perto, em breve.</p></div></RevealWrapper><RevealWrapper delay={2}><div className="video-placeholder" aria-label="Vídeo a ser inserido em breve"><span className="play-circle"><Play size={26} fill="currentColor" /></span><span>Vídeo a ser inserido em breve</span></div></RevealWrapper></div></section>

    <section id="servicos" className="section services-section"><div className="container"><RevealWrapper delay={1}><SectionHeading eyebrow="Serviços" title="Formas de atendimento" centered /></RevealWrapper><RevealWrapper delay={2}><p style={{ maxWidth: '700px', margin: '0 auto 32px', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '1rem', lineHeight: 1.7 }}>Se você ainda não sabe qual formato faz mais sentido pra você, tudo bem. A sessão avulsa é um bom jeito de começar e sentir como é o atendimento; o programa de 8 sessões é pensado pra quem já sabe que quer se dedicar a um processo mais contínuo.</p><div className="service-grid"><article className="service-card service-card--border"><div className="service-top"><span className="service-icon"><MessageCircle size={25} strokeWidth={1.5} /></span><span className="service-index">01 / INDIVIDUAL</span></div><h3>Terapia Online</h3><p className="service-subtitle">Sessão individual</p><div className="price">R$ 200</div><div className="service-line" /><ul><li><Check size={16} />Atendimento 100% on-line</li><li><Check size={16} />~60 minutos, no seu horário</li></ul><WhatsAppLink arrow message="Olá, Claudir! Gostaria de agendar uma sessão individual de Terapia Online.">Agendar pelo WhatsApp</WhatsAppLink></article><article className="service-card service-card--featured"><div className="service-top"><span className="service-icon"><HeartHandshake size={25} strokeWidth={1.5} /></span><span className="service-highlight">Pacote completo</span></div><h3>Programa Reequilíbrio Emocional</h3><p className="service-subtitle">8 sessões</p><div className="price">R$ 1.360</div><div className="service-line" /><ul><li><Check size={16} />8 sessões individuais</li><li><Check size={16} />Acompanhamento contínuo com TRG</li></ul><WhatsAppLink arrow variant="light" message="Olá, Claudir! Gostaria de saber mais sobre o Programa Reequilíbrio Emocional de 8 sessões.">Saber mais pelo WhatsApp</WhatsAppLink></article></div></RevealWrapper></div></section>

    <section id="depoimentos" className="section testimonials-section"><div className="container"><RevealWrapper delay={1}><div className="testimonial-header"><SectionHeading eyebrow="Depoimentos" title="Histórias que merecem ser ouvidas" /><div className="testimonial-note"><Star size={18} fill="currentColor" /> Avaliações do Google em breve</div></div></RevealWrapper><RevealWrapper delay={2}><TestimonialsMarquee /></RevealWrapper></div></section>

    <section id="faq" className="section faq-section"><div className="container faq-grid"><RevealWrapper delay={1}><div><SectionHeading eyebrow="Perguntas frequentes" title="Talvez você ainda tenha alguma dúvida" /><div className="faq-aside-icon" aria-hidden="true"><CircleHelp size={44} strokeWidth={1} /></div></div></RevealWrapper><RevealWrapper delay={2}><Accordion type="single" collapsible className="faq-list">{faq.map(([question, answer], i) => <AccordionItem value={`faq-${i}`} key={question} className="faq-item"><AccordionTrigger className="faq-trigger"><span><span className="faq-number">0{i + 1}</span>{question}</span></AccordionTrigger><AccordionContent className="faq-answer">{answer}</AccordionContent></AccordionItem>)}</Accordion></RevealWrapper></div></section>

    <section id="contato" className="final-section"><div className="container final-inner"><RevealWrapper delay={1}><div className="final-mark"><Sparkles size={24} strokeWidth={1.3} /></div><span className="eyebrow eyebrow--light"><span className="eyebrow-line" /> SEU PRÓXIMO PASSO</span><h2>Dar o primeiro passo já é um cuidado com você</h2><p>Não existe hora certa, nem motivo grande demais ou pequeno demais, para buscar ajuda. Se algo do que você leu aqui fez sentido, será um prazer conversar.</p><WhatsAppLink variant="light" arrow message="Olá, Claudir! Li seu site e gostaria de conversar sobre o atendimento.">Falar com Claudir no WhatsApp</WhatsAppLink><span className="final-decor final-decor-left" aria-hidden="true" /><span className="final-decor final-decor-right" aria-hidden="true" /></RevealWrapper></div></section>
    <footer className="site-footer"><div className="container footer-inner"><span><strong>Claudir J. Corrêa</strong><small>Terapeuta Integrativo</small></span><p>Atendimento on-line · ABRAPH 07853AB</p><a href="#inicio">Voltar ao início <MoveUpRight size={15} /></a></div></footer>
  </main>;
}