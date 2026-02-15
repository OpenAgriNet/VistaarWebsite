import SectionWrapper from '../layout/SectionWrapper';

const NetworkCategories = () => {
  return (
    <SectionWrapper id="network">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-primary">Network Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 bg-secondary rounded-xl shadow-sm border border-primary/10">
              <h3 className="text-xl font-bold mb-4">Category {i}</h3>
              <p className="text-muted-foreground">Description of network category {i}.</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default NetworkCategories;
