<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/home', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/freelance', name: 'app_freelance')]
    public function freelance(): Response
    {
        return $this->render('home/freelance.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/freelance/creation-site-internet', name: 'app_site_internet')]
    public function site_internet(): Response
    {
        return $this->render('home/development_web.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/choice', name: 'app_choice')]
    public function choice(): Response
    {
        return $this->render('home/choice.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}
