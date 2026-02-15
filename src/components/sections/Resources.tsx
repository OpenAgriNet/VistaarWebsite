import SectionWrapper from '../layout/SectionWrapper';

const Resources = () => {
  return (
    <SectionWrapper id="resources">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-primary">Resources</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
          {['Documentation', 'API Reference', 'User Guide', 'Whitepaper'].map((item) => (
            <li key={item} className="p-4 bg-background border border-border rounded-lg hover:border-primary transition-colors cursor-pointer flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
};

export default Resources;
