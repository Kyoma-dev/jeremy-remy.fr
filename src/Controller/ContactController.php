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
    // Récupération des données du formulaire
    $name = htmlspecialchars(trim($request->request->get('name')));
    $subject = htmlspecialchars(trim($request->request->get('subject')));
    $email = filter_var(trim($request->request->get('email')), FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars(trim($request->request->get('message')));

    // Détection de spam avec un champ caché
    if (!empty($request->request->get('hidden_field'))) {
        file_put_contents('var/log/send_mail_debug.log', "Spam détecté - champ caché rempli.\n", FILE_APPEND);
        return new Response("Spam détecté.", Response::HTTP_BAD_REQUEST);
    }

    // Vérification de la validité de l'email
    if ($email !== false) {
        $domain = substr(strrchr($email, "@"), 1); // Extrait le domaine de l'adresse e-mail
        if (!checkdnsrr($domain, "MX")) {
            file_put_contents('var/log/send_mail_debug.log', "Domaine e-mail invalide: $domain.\n", FILE_APPEND);
            $this->addFlash('error', 'Le domaine de l\'adresse e-mail n\'est pas valide.');
            return $this->redirectToRoute('app_home');
        }
    } else {
        file_put_contents('var/log/send_mail_debug.log', "Adresse e-mail invalide : $email.\n", FILE_APPEND);
        $this->addFlash('error', 'Adresse e-mail invalide. Veuillez saisir une adresse correcte.');
        return $this->redirectToRoute('app_home');
    }

    // Si les données sont valides, création de l'e-mail
    if ($name && $subject && $email && $message) {
        $emailMessage = (new Email())
            ->from('contact@jeremy-remy.fr') // Adresse e-mail authentifiée
            ->to('contact@jeremy-remy.fr') // Adresse de réception
            ->replyTo($email) // Permettre de répondre à l'utilisateur
            ->subject($subject)
            ->text("Nom: $name\nEmail: $email\nMessage:\n$message");

        try {
            $mailer->send($emailMessage);
            file_put_contents('var/log/send_mail_debug.log', "E-mail envoyé avec succès.\n", FILE_APPEND);
            $this->addFlash('success', 'Votre message a été envoyé avec succès.');
        } catch (\Exception $e) {
            file_put_contents('var/log/send_mail_debug.log', "Erreur lors de l'envoi de l'e-mail : " . $e->getMessage() . "\n", FILE_APPEND);
            $this->addFlash('error', 'Erreur lors de l\'envoi de l\'e-mail : ' . $e->getMessage());
        }

        return $this->redirectToRoute('app_home'); // Rediriger vers la page d'accueil après l'envoi
    } else {
        file_put_contents('var/log/send_mail_debug.log', "Tous les champs n'ont pas été remplis correctement.\n", FILE_APPEND);
        $this->addFlash('error', 'Veuillez remplir tous les champs.');
    }

    return $this->redirectToRoute('app_home'); // Rediriger vers la page d'accueil en cas d'erreur
}

#[Route('/send-contact', name: 'send_contact', methods: ['POST'])]
    public function sendContact(Request $request, MailerInterface $mailer): Response
{
    // Récupération des données du formulaire
    $name = htmlspecialchars(trim($request->request->get('name')));
    $subject = htmlspecialchars(trim($request->request->get('subject')));
    $email = filter_var(trim($request->request->get('email')), FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars(trim($request->request->get('message')));

    // Détection de spam avec un champ caché
    if (!empty($request->request->get('hidden_field'))) {
        file_put_contents('var/log/send_mail_debug.log', "Spam détecté - champ caché rempli.\n", FILE_APPEND);
        return new Response("Spam détecté.", Response::HTTP_BAD_REQUEST);
    }

    // Vérification de la validité de l'email
    if ($email !== false) {
        $domain = substr(strrchr($email, "@"), 1); // Extrait le domaine de l'adresse e-mail
        if (!checkdnsrr($domain, "MX")) {
            file_put_contents('var/log/send_mail_debug.log', "Domaine e-mail invalide: $domain.\n", FILE_APPEND);
            $this->addFlash('error', 'Le domaine de l\'adresse e-mail n\'est pas valide.');
            return $this->redirectToRoute('app_freelance');
        }
    } else {
        file_put_contents('var/log/send_mail_debug.log', "Adresse e-mail invalide : $email.\n", FILE_APPEND);
        $this->addFlash('error', 'Adresse e-mail invalide. Veuillez saisir une adresse correcte.');
        return $this->redirectToRoute('app_freelance');
    }

    // Si les données sont valides, création de l'e-mail
    if ($name && $subject && $email && $message) {
        $emailMessage = (new Email())
            ->from('contact@jeremy-remy.fr') // Adresse e-mail authentifiée
            ->to('contact@jeremy-remy.fr') // Adresse de réception
            ->replyTo($email) // Permettre de répondre à l'utilisateur
            ->subject($subject)
            ->text("Nom: $name\nEmail: $email\nMessage:\n$message");

        try {
            $mailer->send($emailMessage);
            file_put_contents('var/log/send_mail_debug.log', "E-mail envoyé avec succès.\n", FILE_APPEND);
            $this->addFlash('success', 'Votre message a été envoyé avec succès.');
        } catch (\Exception $e) {
            file_put_contents('var/log/send_mail_debug.log', "Erreur lors de l'envoi de l'e-mail : " . $e->getMessage() . "\n", FILE_APPEND);
            $this->addFlash('error', 'Erreur lors de l\'envoi de l\'e-mail : ' . $e->getMessage());
        }

        return $this->redirectToRoute('app_freelance'); // Rediriger vers la page d'accueil après l'envoi
    } else {
        file_put_contents('var/log/send_mail_debug.log', "Tous les champs n'ont pas été remplis correctement.\n", FILE_APPEND);
        $this->addFlash('error', 'Veuillez remplir tous les champs.');
    }

    return $this->redirectToRoute('app_freelance'); // Rediriger vers la page d'accueil en cas d'erreur
}

#[Route('/test-mail', name: 'test_mail')]
    public function testMail(MailerInterface $mailer): Response
    {
        $email = (new Email())
            ->from('contact@jeremy-remy.fr')
            ->to('votre_adresse_email_de_test@example.com')
            ->subject('Test d\'envoi d\'e-mail depuis Symfony')
            ->text('Ceci est un e-mail de test.');

        try {
            $mailer->send($email);
            return new Response('E-mail envoyé avec succès.');
        } catch (\Exception $e) {
            return new Response('Erreur lors de l\'envoi de l\'e-mail : ' . $e->getMessage());
        }
    }
}