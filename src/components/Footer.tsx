export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PrimeLite. All rights reserved.</p>
        <p className="mt-1">An Amazon-style e-commerce demo built with Next.js and Firebase.</p>
      </div>
    </footer>
  );
}
