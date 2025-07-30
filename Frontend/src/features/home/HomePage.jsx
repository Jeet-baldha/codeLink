import { Button } from "../../Components/ui/button";
import { Card } from "../../Components/ui/card";
import { Badge } from "../../Components/ui/badge";
import { Code2, Video, Globe, Zap, Users, Terminal, PlayCircle, Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const navigate = useNavigate();

    const features = [
        { icon: Code2, title: "Real-time Code Editing", description: "Collaborative coding with instant synchronization across all participants" },
        { icon: Video, title: "Video Calling", description: "Built-in video calls for seamless communication while coding" },
        { icon: Globe, title: "Multi-language Support", description: "Support for multiple programming languages with syntax highlighting" },
        { icon: Terminal, title: "LeetCode Integration", description: "Fetch and solve LeetCode problems collaboratively using problem URLs" },
        { icon: Zap, title: "Custom Themes", description: "Multiple editor themes to match your coding preferences" },
        { icon: Users, title: "Team Collaboration", description: "Multiple users can code together in real-time" }
    ];

    const handleClick = async () => {
        try {
            const result = await axios.post(`http://localhost:3000/createRoom`);
            if (result.data.success) {
                navigate(`/code/${result.data.roomId}`);
            }
        } catch (error) {
            alert('Something went wrong!');
        }
    };

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> CodeLink </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Features</a>
                        <a href="#about" className="text-lg text-muted-foreground hover:text-foreground transition-colors">About</a>
                        <a href="#contact" className="text-lg text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" asChild>
                            <a href="/login">Sign In</a>
                        </Button>
                        <Button className="bg-gradient-to-r from-primary to-accent glow-primary" asChild>
                            <a href="/signup">Get Started</a>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <Badge className="mb-6 bg-gradient-to-r from-accent to-primary text-accent-foreground"> Live Collaborative Coding Platform </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight"> Code Together, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Build Faster</span> </h1>
                    <p className="text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"> Real-time collaborative coding with video calls, multi-language support, and LeetCode integration. Perfect for pair programming, interviews, and team development. </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button size="lg" className="bg-gradient-to-r from-primary to-accent glow-primary text-xl px-8 py-6" onClick={handleClick}>
                            <PlayCircle className="mr-2 h-5 w-5" />
                            Start Coding Now
                        </Button>
                        <Button size="lg" variant="outline" className="text-xl px-8 py-6">
                            <Video className="mr-2 h-5 w-5" />
                            Watch Demo
                        </Button>
                    </div>
                    {/* Code Editor Preview */}
                    <div className="relative">
                        <Card className="p-6 bg-card/80 backdrop-blur glow-primary animate-float">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="secondary">JavaScript</Badge>
                                    <Badge variant="secondary">3 Users</Badge>
                                </div>
                            </div>
                            <div className="text-left font-mono text-sm bg-muted p-4 rounded-lg">
                                <div className="text-accent">// Collaborative coding in action</div>
                                <div className="text-primary">function</div>
                                <div className="text-foreground">solveTwoSum(nums, target) {`{`}</div>
                                <div className="ml-4 text-muted-foreground">const map = new Map();</div>
                                <div className="ml-4 text-muted-foreground">for (let i = 0; i &lt; nums.length; i++) {`{`}</div>
                                <div className="ml-8 text-accent">// Add your solution here...</div>
                                <div className="ml-4">{`}`}</div>
                                <div>{`}`}</div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto"> Everything you need for collaborative coding, from real-time editing to video communication </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="p-6 bg-card/80 backdrop-blur hover:glow-accent transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-accent to-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6 text-accent-foreground" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-lg text-muted-foreground">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-6 py-20">
                <Card className="p-12 bg-card/80 backdrop-blur glow-primary text-center">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">10K+</div>
                            <div className="text-lg text-muted-foreground">Active Developers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">500K+</div>
                            <div className="text-lg text-muted-foreground">Code Sessions</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">99.9%</div>
                            <div className="text-lg text-muted-foreground">Uptime</div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-20 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Coding Together?</h2>
                    <p className="text-2xl text-muted-foreground mb-8"> Join thousands of developers who are already collaborating on CodeLink </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-gradient-to-r from-primary to-accent glow-primary text-xl px-8 py-6" onClick={handleClick}>
                            <Star className="mr-2 h-5 w-5" />
                            Start Free Trial
                        </Button>
                        <Button size="lg" variant="outline" className="text-xl px-8 py-6">
                            View Pricing
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border bg-card/50 backdrop-blur">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">CodeLink</span>
                        </div>
                        <div className="flex items-center space-x-6 text-muted-foreground">
                            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                            <a href="#" className="hover:text-foreground transition-colors">Support</a>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
                        <p>&copy; 2024 CodeLink. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage; 