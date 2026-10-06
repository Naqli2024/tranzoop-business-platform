import { Quote } from "lucide-react";

const testimonials = [
  {
    initials: "SM",
    quote: "Bizooop has completely transformed how we work. Our team is more productive and our operations are smoother than ever.",
    name: "Sarah Mitchell",
    role: "CEO, Acme Industries",
  },
  {
    initials: "DC",
    quote: "The platform is intuitive, powerful and the support team is incredible. Highly recommended!",
    name: "David Chen",
    role: "Operations Head, BrightRetail",
  },
  {
    initials: "PN",
    quote: "We’ve scaled to 5x our growth with Bizooop. It’s the best investment we’ve made.",
    name: "Priya Nair",
    role: "Founder, HealthPlus",
  },
];


const Testimonials = () => {
  return (
<section className="testimonial-band">
        <div className="container" data-reveal>
          <p className="eyebrow">Trusted by leading companies</p>
          <h2>Real businesses. Real results.</h2>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.name}>
                <div className="person-row"><span className="person-avatar">{item.initials}</span><Quote /></div>
                <p>“{item.quote}”</p>
                <footer><span><strong>{item.name}</strong><small>{item.role}</small></span><b>★★★★★</b></footer>
              </article>
            ))}
          </div>
          <div className="slider-dots" aria-hidden="true"><i /><i /><i /><i /></div>
        </div>
      </section>
  )
}

export default Testimonials