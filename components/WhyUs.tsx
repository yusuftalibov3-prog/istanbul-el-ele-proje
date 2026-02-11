import React from 'react';

const WhyUs: React.FC = () => {
  const features = [
    { title: 'Hızlı Erişim', desc: 'İhtiyaç sahiplerine en kısa sürede ulaşın.', icon: 'fa-bolt' },
    { title: 'Güvenli Alan', desc: 'Sadece gönüllülük esaslı, şeffaf iletişim.', icon: 'fa-shield-alt' },
    { title: 'Mahalle Kültürü', desc: 'İstanbulun dayanışma ruhunu dijitale taşıyoruz.', icon: 'fa-users' }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Neden İstanbul El Ele?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                <i className={`fas ${f.icon}`}></i>
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
