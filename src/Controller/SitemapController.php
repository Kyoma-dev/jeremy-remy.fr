<?php

// src/Controller/SitemapController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class SitemapController extends AbstractController
{
    private $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }


    #[Route('/sitemap.xml', name: 'sitemap', defaults: ['_format' => 'xml'])]
    public function index(): Response
    {
        // Liste des URLs à inclure dans le sitemap
        $urls = [
            [
                'loc' => $this->urlGenerator->generate('app_home', [], UrlGeneratorInterface::ABSOLUTE_URL),
                'lastmod' => (new \DateTime())->format('Y-m-d'),
                'changefreq' => 'daily',
                'priority' => '1.0',
            ],
            // Ajoutez d'autres URLs si nécessaire
        ];

        return $this->render('sitemap.xml.twig', [
            'urls' => $urls,
        ], new Response('', 200, ['Content-Type' => 'application/xml']));
    }
}
