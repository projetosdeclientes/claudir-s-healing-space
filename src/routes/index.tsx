import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, ArrowDown, ArrowRight, BadgeCheck, Brain, Check, CircleHelp, Clock3, Cloud, Heart, HeartHandshake, LockKeyhole, MessageCircle, MoveUpRight, Play, Quote, ShieldCheck, Sparkles, Star, UserRound, UsersRound, Waves, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import logoNavbar from "@/assets/logo-abraph-navbar.png.asset.json";
import logoSelo from "@/assets/logo-abraph-selo.png.asset.json";
import heroCoast from "@/assets/uploads/4308.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Claudir J. Corrêa — Terapeuta Integrativo | Atendimento on-line" },
      { name: "description", content: "Claudir J. Corrêa é terapeuta integrativo com atuação desde 2007. Atendimento individual 100% on-line com TRG como abordagem principal. Conheça os serviços e converse pelo WhatsApp." },
      { property: "og:title", content: "Claudir J. Corrêa — Terapeuta Integrativo" },
      { property: "og:description", content: "Um espaço de escuta e cuidado, no seu tempo. Atendimento individual 100% on-line com Claudir J. Corrêa." },
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
  ["O atendimento é mesmo 100% on-line?", "Sim, todas as sessões acontecem on-line, com total privacidade."],
  ["Quanto tempo dura cada sessão?", "Aproximadamente 60 minutos."],
  ["Qual é a abordagem utilizada?", "A TRG (Terapia de Reprocessamento Generativo) é a principal abordagem."],
  ["Como faço para agendar?", "Basta chamar no WhatsApp para conversarmos sobre o melhor horário."],
  ["Quais são os valores?", "Sessão individual: R$ 200. Programa Reequilíbrio Emocional (8 sessões): R$ 1.360."],
];

function SectionHeading({ eyebrow, title, description, centered = false }: { eyebrow?: string; title: string; description?: string; centered?: boolean }) {
  return <div className={`section-heading ${centered ? "section-heading--center" : ""}`}>
    {eyebrow && <span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span>}
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
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
          <p>Você não precisa continuar carregando isso sozinho. Um espaço de escuta e cuidado com Claudir J. Corrêa, Terapeuta Integrativo.</p>
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
        <div className="pain-header"><SectionHeading eyebrow="Identificação" title="Isso tem soado familiar pra você?" description="Cada pessoa vive isso de um jeito. Talvez você se reconheça em uma ou mais dessas situações:" /><div className="header-ornament" aria-hidden="true"><span>01</span><i /></div></div>
        <div className="pain-grid">{pains.map(({ icon: Icon, title, text }, index) => <article className="pain-card" key={title}><div className="pain-card-top"><span className="icon-box"><Icon size={25} strokeWidth={1.65} /></span><span className="card-number">0{index + 1}</span></div><h3>{title}</h3><p>{text}</p><ArrowRight className="pain-arrow" size={17} /></article>)}</div>
      </div>
    </section>

    <section className="change-section"><div className="container change-inner"><span className="change-symbol" aria-hidden="true"><HeartHandshake size={30} strokeWidth={1.35} /></span><p>Cuidar das suas questões emocionais pode ser o primeiro passo para mais equilíbrio e bem-estar. <strong>Você não precisa ter todas as respostas agora, só o espaço certo para começar.</strong></p><span className="change-deco" aria-hidden="true">✳</span></div></section>

    <section id="ajuda" className="section help-section"><div className="container help-grid"><div className="help-art" aria-hidden="true"><div className="help-art-inner"><span className="help-art-ring help-art-ring-one" /><span className="help-art-ring help-art-ring-two" /><span className="help-art-center"><Heart size={72} strokeWidth={0.75} /></span><span className="help-art-small help-art-small-one"><Waves size={23} /></span><span className="help-art-small help-art-small-two"><Sparkles size={21} /></span></div><span className="help-art-caption">ESCUTA · RESPEITO · ACOLHIMENTO</span></div><div className="help-copy"><SectionHeading eyebrow="Como posso ajudar" title="Um espaço de escuta, no seu tempo" description="Trabalho com adultos que enfrentam ansiedade, estresse, sobrecarga emocional, medos, inseguranças e baixa autoestima. Minha principal abordagem é a TRG (Terapia de Reprocessamento Generativo), que ajuda a olhar essas questões de um jeito mais leve e prático, respeitando a história e o tempo de cada pessoa." /><ul className="check-list"><li><Check size={16} />TRG como abordagem principal, sem fórmulas prontas</li><li><Check size={16} />Escuta respeitosa, no tempo de cada pessoa</li><li><Check size={16} />Espaço privado e sem julgamentos</li></ul><WhatsAppLink variant="outline" arrow message="Olá, Claudir! Quero entender melhor como funciona seu atendimento com TRG.">Quero entender melhor</WhatsAppLink></div></div></section>

    <section id="funciona" className="section process-section"><div className="container"><SectionHeading eyebrow="Como funciona" title="O atendimento, de forma simples" centered /><div className="steps"><div className="steps-line" aria-hidden="true" />{[{ icon: UserRound, title: "Individual", text: "Sessões um a um" }, { icon: Cloud, title: "100% on-line", text: "De onde você estiver" }, { icon: Clock3, title: "~60 minutos", text: "Por sessão" }, { icon: Brain, title: "TRG", text: "Abordagem principal" }].map(({ icon: Icon, title, text }, i) => <div className="step" key={title}><span className="step-icon"><Icon size={27} strokeWidth={1.55} /></span><span className="step-count">0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

    <section id="sobre" className="section about-section"><div className="container about-grid"><div className="portrait-placeholder" role="img" aria-label="Espaço reservado para a foto de Claudir J. Corrêa"><div className="portrait-frame"><UserRound size={75} strokeWidth={0.75} /><span>FOTO DE CLAUDIR<br />EM BREVE</span></div><span className="portrait-corner" /></div><div className="about-copy"><SectionHeading eyebrow="Sobre mim" title="Claudir J. Corrêa" description="Sou Claudir J. Corrêa, Terapeuta Integrativo, com atuação na área terapêutica desde 2007. Acredito que cada pessoa tem uma história única, por isso ofereço um espaço de escuta, respeito e acolhimento, considerando o momento e as necessidades de cada pessoa. O atendimento é realizado 100% on-line, de forma individualizada e com privacidade." /><div className="about-divider" /><p className="mini-label">FORMAÇÃO E CONHECIMENTOS</p><div className="formation-pills"><span className="formation-primary">TRG (abordagem principal)</span><span>Reiki</span><span>PNL</span><span>Hipnose</span><span>Inteligência Emocional</span></div><div className="credential"><img src={logoSelo.url} width="92" height="74" alt="Selo ABRAPH terapeuta credenciado 07853AB" /><span><strong>ABRAPH Credenciado</strong><small>Registro 07853AB</small></span><BadgeCheck size={21} aria-hidden="true" /></div></div></div></section>

    <section id="video" className="section video-section"><div className="container video-layout"><div><SectionHeading eyebrow="Apresentação" title="Um pouco sobre o meu trabalho" /><p className="video-support">Uma conversa mais de perto, em breve.</p></div><div className="video-placeholder" aria-label="Vídeo a ser inserido em breve"><span className="play-circle"><Play size={26} fill="currentColor" /></span><span>Vídeo a ser inserido em breve</span></div></div></section>

    <section id="servicos" className="section services-section"><div className="container"><SectionHeading eyebrow="Serviços" title="Formas de atendimento" centered /><div className="service-grid"><article className="service-card"><div className="service-top"><span className="service-icon"><MessageCircle size={25} strokeWidth={1.5} /></span><span className="service-index">01 / INDIVIDUAL</span></div><h3>Terapia Online</h3><p className="service-subtitle">Sessão individual</p><div className="price">R$ 200</div><div className="service-line" /><ul><li><Check size={16} />Atendimento 100% on-line</li><li><Check size={16} />~60 minutos, no seu horário</li></ul><WhatsAppLink arrow message="Olá, Claudir! Gostaria de agendar uma sessão individual de Terapia Online.">Agendar pelo WhatsApp</WhatsAppLink></article><article className="service-card service-card--featured"><div className="service-top"><span className="service-icon"><HeartHandshake size={25} strokeWidth={1.5} /></span><span className="service-highlight">Pacote completo</span></div><h3>Programa Reequilíbrio Emocional</h3><p className="service-subtitle">8 sessões</p><div className="price">R$ 1.360</div><div className="service-line" /><ul><li><Check size={16} />8 sessões individuais</li><li><Check size={16} />Acompanhamento contínuo com TRG</li></ul><WhatsAppLink arrow variant="light" message="Olá, Claudir! Gostaria de saber mais sobre o Programa Reequilíbrio Emocional de 8 sessões.">Saber mais pelo WhatsApp</WhatsAppLink></article></div></div></section>

    <section id="depoimentos" className="section testimonials-section"><div className="container"><div className="testimonial-header"><SectionHeading eyebrow="Depoimentos" title="Histórias que merecem ser ouvidas" /><div className="testimonial-note"><Star size={18} fill="currentColor" /> Avaliações do Google em breve</div></div></div><TestimonialsMarquee /></section>

    <section id="faq" className="section faq-section"><div className="container faq-grid"><div><SectionHeading eyebrow="Perguntas frequentes" title="Talvez você ainda tenha alguma dúvida" /><div className="faq-aside-icon" aria-hidden="true"><CircleHelp size={44} strokeWidth={1} /></div></div><Accordion type="single" collapsible className="faq-list">{faq.map(([question, answer], i) => <AccordionItem value={`faq-${i}`} key={question} className="faq-item"><AccordionTrigger className="faq-trigger"><span><span className="faq-number">0{i + 1}</span>{question}</span></AccordionTrigger><AccordionContent className="faq-answer">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section id="contato" className="final-section"><div className="container final-inner"><div className="final-mark"><Sparkles size={24} strokeWidth={1.3} /></div><span className="eyebrow eyebrow--light"><span className="eyebrow-line" /> SEU PRÓXIMO PASSO</span><h2>Dar o primeiro passo já é um cuidado com você</h2><p>Se algo do que você leu aqui fez sentido, será um prazer conversar.</p><WhatsAppLink variant="light" arrow message="Olá, Claudir! Li seu site e gostaria de conversar sobre o atendimento.">Falar com Claudir no WhatsApp</WhatsAppLink><span className="final-decor final-decor-left" aria-hidden="true" /><span className="final-decor final-decor-right" aria-hidden="true" /></div></section>
    <footer className="site-footer"><div className="container footer-inner"><span><strong>Claudir J. Corrêa</strong><small>Terapeuta Integrativo</small></span><p>Atendimento on-line · ABRAPH 07853AB</p><a href="#inicio">Voltar ao início <MoveUpRight size={15} /></a></div></footer>
  </main>;
}