<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ContactController extends AbstractController
{
    #[Route('/send-mail', name: 'send_mail', methods: ['POST'])]
    public function sendMail(Request $request, MailerInterface $mailer): Response
    {
        $name = htmlspecialchars(trim($request->request->get('name')));
        $subject = htmlspecialchars(trim($request->request->get('subject')));
        $email = filter_var(trim($request->request->get('email')), FILTER_VALIDATE_EMAIL);
        $message = htmlspecialchars(trim($request->request->get('message')));

        // Détection de spam avec un champ caché
        if (!empty($request->request->get('hidden_field'))) {
            return new Response("Spam détecté.", Response::HTTP_BAD_REQUEST);
        }

        // Vérification de la validité de l'email
        if ($email !== false) {
            $domain = substr(strrchr($email, "@"), 1); // Extrait le domaine de l'adresse e-mail
            if (!checkdnsrr($domain, "MX")) {
                $this->addFlash('error', 'Le domaine de l\'adresse e-mail n\'est pas valide.');
                return $this->redirectToRoute('app_home');
            }
        } else {
            $this->addFlash('error', 'Adresse e-mail invalide. Veuillez saisir une adresse correcte.');
            return $this->redirectToRoute('app_home');
        }

        if ($name && $subject && $email && $message) {
            $emailMessage = (new Email())
                ->from($email) // Utiliser l'email de l'utilisateur comme expéditeur
                ->to('contact@jeremy-remy.fr') // Adresse de réception
                ->subject($subject)
                ->text("Nom: $name\nEmail: $email\nMessage:\n$message");

            try {
                $mailer->send($emailMessage);
                $this->addFlash('success', 'Votre message a été envoyé avec succès.');
            } catch (\Exception $e) {
                $this->addFlash('error', 'Erreur lors de l\'envoi de l\'e-mail : ' . $e->getMessage());
            }

            return $this->redirectToRoute('app_home'); // Rediriger vers la page d'accueil après l'envoi
        } else {
            $this->addFlash('error', 'Veuillez remplir tous les champs.');
        }

        return $this->redirectToRoute('app_home'); // Rediriger vers la page d'accueil en cas d'erreur
    }
}