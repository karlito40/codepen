# Resume
Cette experience a pour but de piloter un pc à distance depuis un smartphone afin d'emuler. L'idée étant à termes de controler un raspberry branché sur une tv.

J'ai opté pour les websoccket en me disant que les problèmes de latence n'en serait peut être pas avec le Wifi Direct (sauf sur mac...). A vrai dire, j'aurais préféré utiliser le bluetooth mais je n'ai jamais réussi à le faire fonctionner. Une autre solution serait de faire du p2p + udp mais l'implementation de WebRTC est tellement chiante.

## SocketIO
Probleme de perf abyssale, le serveur devient fou meme avec des throttles coté client.

## SocketIO-P2P
Meme probleme

## Websocket "pure" sans framework
Les soucis liés à SocketIO s'envolent, on a meme plus besoin de throttle. Néanmoins, on a toujours un temps de réponse important après un "swipe" trop rapide. (aussi present dans la version socketio)

## Gorilla (go)
Je pensais que ce dernier probleme venait de node... et bien non. Le soucis existe aussi en go.

# Conclusion
Je vais opter pour les websocket node et je ferai évoluer le tout vers du webRTC si l'experience utilisateur devient lourde.
