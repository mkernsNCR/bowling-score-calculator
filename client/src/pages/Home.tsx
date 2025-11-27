import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Calculator, BookOpen, Edit3, Zap, Target, Trophy } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Bowling Score Tutor</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  className="flex gap-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm md:text-lg"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      X
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Master Bowling Scoring
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Learn how strikes, spares, and the mysterious 10th frame actually work. 
                Interactive scoring that teaches as you play.
              </p>

              <Link href="/play">
                <Button size="lg" className="text-lg px-8 py-6" data-testid="button-start-bowling">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Bowling
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Why Bowling Scoring is Confusing (And How We Fix It)
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Calculator className="w-8 h-8" />}
                title="Real-Time Calculation"
                description="Watch your score update instantly as you enter each roll. No more waiting until the end to see how you did."
                delay={0}
              />
              <FeatureCard
                icon={<BookOpen className="w-8 h-8" />}
                title="Frame-by-Frame Explanations"
                description="Every frame shows you exactly how the score was calculated. Finally understand why that strike was worth 30 points!"
                delay={0.1}
              />
              <FeatureCard
                icon={<Edit3 className="w-8 h-8" />}
                title="Edit Any Frame"
                description="Made a mistake? Click any frame to fix it. Perfect for learning 'what if' scenarios."
                delay={0.2}
              />
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Quick Scoring Guide</h2>
              <p className="text-muted-foreground">The basics you need to know</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <ScoringTip
                symbol="X"
                title="Strike"
                description="Knock down all 10 pins on your first roll. Score = 10 + your next 2 rolls."
                example="Strike, then 7 and 2 = 10 + 7 + 2 = 19 points"
              />
              <ScoringTip
                symbol="/"
                title="Spare"
                description="Knock down all 10 pins using both rolls. Score = 10 + your next roll."
                example="Spare, then 6 = 10 + 6 = 16 points"
              />
              <ScoringTip
                symbol="7 2"
                title="Open Frame"
                description="Didn't knock all 10 down? You just get the pins you hit."
                example="7 pins, then 2 pins = 9 points"
              />
              <ScoringTip
                symbol="10"
                title="10th Frame"
                description="The special finale! Get up to 3 rolls if you strike or spare."
                example="Three strikes = 30 points in that frame alone!"
              />
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-6 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Trophy className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Bowl a Perfect Game?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                A perfect game is 12 strikes for 300 points. Think you can figure out why? Let's find out!
              </p>
              <Link href="/play">
                <Button size="lg" variant="default" data-testid="button-start-bowling-bottom">
                  Let's Bowl
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Bowling Score Tutor - Learn the game, one frame at a time.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="p-6 h-full">
        <div className="text-primary mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  );
}

function ScoringTip({ symbol, title, description, example }: { symbol: string; title: string; description: string; example: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center font-mono text-xl font-bold text-primary flex-shrink-0">
            {symbol}
          </div>
          <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
            <p className="text-xs font-mono bg-muted px-2 py-1 rounded inline-block">{example}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
