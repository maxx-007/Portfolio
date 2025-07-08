# NeonHack Nexus - Cyberpunk Portfolio

A cybersecurity-focused portfolio website with heavy inspiration from The Matrix, JARVIS, TRON, and cyberpunk aesthetics. Built with React, Three.js, and cutting-edge web technologies.

![NeonHack Nexus Screenshot](screenshot.png)

## Features

- 🌆 Dynamic 3D Cyberpunk City with procedurally generated buildings
- 🔮 Interactive JARVIS-inspired HUD with real-time security monitoring
- 🖥️ Fully functional terminal with cybersecurity-themed commands
- 🌧️ Matrix-style digital rain effect with custom characters
- 💫 Holographic beams and quantum particle effects
- 🎨 Stunning visual effects using post-processing and bloom
- 📱 Fully responsive design for all devices

## Technologies Used

- React 18
- Three.js with React Three Fiber
- Framer Motion for animations
- SASS for styling
- Post-processing effects
- Custom WebGL shaders

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neonhack-nexus.git
   cd neonhack-nexus
   ```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Commands

The terminal interface supports the following commands:

- `help` - Display available commands
- `skills` - Display technical skills
- `projects` - List cybersecurity projects
- `contact` - Show contact information
- `scan` - Run security scan simulation
- `matrix` - Toggle Matrix rain effect
- `clear` - Clear terminal

## Project Structure

```
neonhack-nexus/
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CyberCity.jsx
│   │   │   └── ...
│   │   ├── effects/
│   │   │   ├── MatrixRain.jsx
│   │   │   └── ...
│   │   ├── hud/
│   │   │   └── JarvisHUD.jsx
│   │   └── terminal/
│   │       └── CyberTerminal.jsx
│   ├── styles/
│   │   ├── themes.scss
│   │   ├── terminal.scss
│   │   ├── hud.scss
│   │   └── main.scss
│   └── App.jsx
├── public/
│   └── fonts/
└── package.json
```

## Customization

1. Theme colors and variables can be modified in `src/styles/themes.scss`
2. Terminal commands can be customized in `src/components/terminal/CyberTerminal.jsx`
3. HUD elements can be modified in `src/components/hud/JarvisHUD.jsx`
4. 3D city parameters can be adjusted in `src/components/3d/CyberCity.jsx`

## Performance Optimization

The project includes several optimizations:
- Efficient 3D rendering using React Three Fiber
- Lazy loading of heavy components
- Memoization of expensive computations
- Optimized post-processing effects
- Responsive design considerations

## Browser Support

Tested and working in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Note: WebGL 2.0 support is required for all visual effects.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by The Matrix, JARVIS (Iron Man), TRON, and cyberpunk aesthetics
- Three.js community for 3D rendering capabilities
- React ecosystem for modern web development
- Cyberpunk 2077 for visual inspiration
