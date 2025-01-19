export default function LandingPage() {
    return (
      <div className="space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing features and boost your productivity with our innovative solutions.
          </p>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Feature 1', 'Feature 2', 'Feature 3'].map((feature, index) => (
            <div key={index} className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">{feature}</h2>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </section>
      </div>
    )
}
  