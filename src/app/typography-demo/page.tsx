export default function TypographyDemo() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-display-lg text-foreground mb-6">
            Typography System
          </h1>
          <p className="text-body-lg text-muted-foreground">
            Showcasing all typography styles from the design system
          </p>
        </div>

        {/* Display Styles */}
        <section className="space-y-6">
          <h2 className="text-heading-lg text-foreground border-b pb-2">
            Display Styles (Phudu, SemiBold)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Display Large - 83px</p>
              <h1 className="text-display-lg text-foreground">The quick brown fox</h1>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Display Medium - 67px</p>
              <h1 className="text-display-md text-foreground">The quick brown fox</h1>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Display Small - 53px</p>
              <h1 className="text-display-sm text-foreground">The quick brown fox</h1>
            </div>
          </div>
        </section>

        {/* Heading Styles */}
        <section className="space-y-6">
          <h2 className="text-heading-lg text-foreground border-b pb-2">
            Heading Styles (Phudu, SemiBold)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Heading Large - 43px</p>
              <h2 className="text-heading-lg text-foreground">The quick brown fox</h2>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Heading Medium - 34px</p>
              <h3 className="text-heading-md text-foreground">The quick brown fox</h3>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Heading Small - 27px</p>
              <h4 className="text-heading-sm text-foreground">The quick brown fox</h4>
            </div>
          </div>
        </section>

        {/* Title Styles */}
        <section className="space-y-6">
          <h2 className="text-heading-lg text-foreground border-b pb-2">
            Title Styles (Phudu, SemiBold)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Title Large - 22px</p>
              <h5 className="text-title-lg text-foreground">The quick brown fox</h5>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Title Medium - 17px</p>
              <h6 className="text-title-md text-foreground">The quick brown fox</h6>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Title Small - 14px</p>
              <span className="text-title-sm text-foreground">The quick brown fox</span>
            </div>
          </div>
        </section>

        {/* Body Styles */}
        <section className="space-y-6">
          <h2 className="text-heading-lg text-foreground border-b pb-2">
            Body Styles (Mozilla Headline)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Body Large - 17px</p>
              <p className="text-body-lg text-foreground">
                The quick brown fox jumps over the lazy dog. This is body large text with regular weight.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Body Large Bold - 17px</p>
              <p className="text-body-lg-bold text-foreground">
                The quick brown fox jumps over the lazy dog. This is body large text with bold weight.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Body Medium - 14px</p>
              <p className="text-body-md text-foreground">
                The quick brown fox jumps over the lazy dog. This is body medium text with regular weight.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Body Medium Bold - 14px</p>
              <p className="text-body-md-bold text-foreground">
                The quick brown fox jumps over the lazy dog. This is body medium text with bold weight.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Body Small - 9px</p>
              <p className="text-body-sm text-foreground">
                The quick brown fox jumps over the lazy dog. This is body small text with regular weight.
              </p>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Body Small Bold - 9px</p>
              <p className="text-body-sm-bold text-foreground">
                The quick brown fox jumps over the lazy dog. This is body small text with bold weight.
              </p>
            </div>
          </div>
        </section>

        {/* Button Styles */}
        <section className="space-y-6">
          <h2 className="text-heading-lg text-foreground border-b pb-2">
            Button Styles (Phudu, Medium)
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Button Large - 14px</p>
              <button className="text-btn-lg bg-primary text-primary-foreground px-6 py-3 rounded-lg">
                Button Large Text
              </button>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Button Small - 10px</p>
              <button className="text-btn-sm bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
                Button Small Text
              </button>
            </div>
          </div>
        </section>

        {/* Link and Sublines */}
        <section className="space-y-6">
          <h2 className="text-heading-lg text-foreground border-b pb-2">
            Link and Sublines
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Link - 14px (Mozilla Headline)</p>
              <a href="#" className="text-link text-primary hover:underline">
                This is a link with link typography
              </a>
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground mb-2">Sublines - 10px (Phudu)</p>
              <span className="text-sublines text-muted-foreground">
                This is sublines text for supplementary information
              </span>
            </div>
          </div>
        </section>

        {/* Font Family Comparison */}
        <section className="space-y-6">
          <h2 className="text-heading-lg text-foreground border-b pb-2">
            Font Family Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-title-md text-foreground mb-3">Phudu Font</h3>
              <p className="text-body-md text-foreground mb-2">
                <span className="text-display-sm">Display Small</span>
              </p>
              <p className="text-body-md text-foreground mb-2">
                <span className="text-heading-sm">Heading Small</span>
              </p>
              <p className="text-body-md text-foreground mb-2">
                <span className="text-title-sm">Title Small</span>
              </p>
              <p className="text-body-md text-foreground">
                <span className="text-btn-sm">Button Small</span>
              </p>
            </div>
            <div>
              <h3 className="text-title-md text-foreground mb-3">Mozilla Headline Font</h3>
              <p className="text-body-md text-foreground mb-2">
                <span className="text-body-lg">Body Large</span>
              </p>
              <p className="text-body-md text-foreground mb-2">
                <span className="text-body-md">Body Medium</span>
              </p>
              <p className="text-body-md text-foreground mb-2">
                <span className="text-body-sm">Body Small</span>
              </p>
              <p className="text-body-md text-foreground">
                <span className="text-link">Link Text</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
