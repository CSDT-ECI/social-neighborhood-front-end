import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://csdt-eci.github.io',
  base: '/social-neighborhood-front-end',
  integrations: [
    starlight({
      title: 'Bitácora CSDT',
      description: 'Informe de Deuda Técnica y análisis de calidad del proyecto social-neighborhood-front-end',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Español', lang: 'es' },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/CSDT-ECI/social-neighborhood-front-end' },
      ],
      sidebar: [
        { label: 'Inicio', link: '/' },
        {
          label: 'Arquitectura y Diseño',
          badge: { text: 'Crítico', variant: 'danger' },
          items: [
            { label: 'Problemas de Arquitectura', link: '/problemas_arquitectura/' },
            { label: 'Violaciones de Principios de Diseño', link: '/violaciones_principios_diseno/' },
            { label: 'Problemas de Testabilidad', link: '/problemas_testabilidad/' },
            { label: 'Architectural Smells', link: '/architectural_smells/' },
          ],
        },
        {
          label: 'Calidad de Código',
          badge: { text: 'Análisis', variant: 'caution' },
          items: [
            { label: 'Olores de Código', link: '/olores_codigo/' },
            { label: 'Principios Clean Code', link: '/principios_clean_code/' },
            { label: 'Estrategias de Refactorización', link: '/estrategias_refactorizacion/' },
            { label: 'Riesgos de Mantenibilidad', link: '/riesgos_mantenibilidad/' },
            { label: 'Deuda Técnica', link: '/deuda_tecnica/' },
          ],
        },
        {
          label: 'Proceso y Prácticas',
          badge: { text: 'Mejora', variant: 'tip' },
          items: [
            { label: 'Prácticas XP y Backlog', link: '/practicas_xp_backlog/' },
            { label: 'Análisis de Calidad y Herramientas', link: '/quality_settings/' },
            { label: 'DevEx y SPACE', link: '/devex_space_analysis/' },
            { label: 'Vibe Coding + Spec-Driven', link: '/vibe_coding_spec_driven/' },
          ],
        },
        {
          label: 'CI/CD',
          badge: { text: 'Pipeline', variant: 'note' },
          items: [
            { label: 'Integración Continua', link: '/bitacora_ci_github_actions/' },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});