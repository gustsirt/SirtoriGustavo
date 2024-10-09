// Mapeo de íconos organizado en diferentes categorías
const iconMap = {
  languages: {
    JavaScript: 'logos:javascript',
    Python: 'logos:python',
    Go: 'logos:go',
    Ruby: 'logos:ruby',
    Java: 'logos:java',
    CSharp: 'logos:csharp',
    PHP: 'logos:php',
    Rust: 'logos:rust',
    Kotlin: 'logos:kotlin',
    'No Code': 'logos:no-code',
  },
  frameworks: {
    React: 'logos:react',
    Vue: 'logos:vue',
    Angular: 'logos:angular',
    'Node.js': 'logos:nodejs',
    Express: 'logos:express',
    Django: 'logos:django',
    Flask: 'logos:flask',
    FastAPI: 'logos:fastapi',
    Rails: 'logos:rails',
    Spring: 'logos:spring',
    'ASP.NET': 'logos:aspnet',
    Laravel: 'logos:laravel',
    Ktor: 'logos:ktor',
    Rocket: 'logos:rocket',
    Unity: 'logos:unity',
    'no-code': 'logos:no-code',
  },
  databases: {
    MongoDB: 'logos:mongodb',
    MySQL: 'logos:mysql',
    PostgreSQL: 'logos:postgresql',
    SQLite: 'logos:sqlite',
    Redis: 'logos:redis',
  },
  tools: {
    Git: 'logos:git',
    GitHub: 'logos:github-icon',
    Docker: 'logos:docker-icon',
    VSCode: 'logos:visual-studio-code',
    Postman: 'logos:postman',
    Webpack: 'logos:webpack',
    Figma: 'logos:figma',
    Trello: 'logos:trello', // Herramienta de gestión de proyectos
    Jira: 'logos:jira', // Gestión de proyectos y seguimiento de errores
    Slack: 'logos:slack', // Plataforma de comunicación en equipo
    Discord: 'logos:discord', // Comunicación en tiempo real
    Heroku: 'logos:heroku', // Despliegue de aplicaciones
    Netlify: 'logos:netlify', // Despliegue de sitios estáticos
    Vercel: 'logos:vercel', // Despliegue de aplicaciones frontend
    AWS: 'logos:aws', // Amazon Web Services
    Azure: 'logos:azure', // Microsoft Azure
    GCP: 'logos:gcp', // Google Cloud Platform
    
    // packageManagers
    Npm: 'logos:npm', // Manejador de paquetes para JavaScript
    Yarn: 'logos:yarn', // Alternativa a Npm
    Pip: 'logos:pip', // Manejador de paquetes para Python
    Composer: 'logos:composer', // Manejador de paquetes para PHP
    Maven: 'logos:maven', // Manejador de paquetes para Java
    NuGet: 'logos:nuget', // Manejador de paquetes para C#
    Cargo: 'logos:cargo', // Manejador de paquetes para Rust
    Gradle: 'logos:gradle', // Herramienta de automatización de proyectos y manejo de dependencias para Java
  },
};

export default iconMap;
