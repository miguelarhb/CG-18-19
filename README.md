# CG-18-19
Projetos de Computação Gráfica 18/19

# 1ºTrabalho

1. Esboçar em papel e, de seguida, modelar em three.js os seguintes
objectos: uma mesa, usando caixas e cilindros; uma cadeira de
escritório, com rodas, usando cubos e torus; e um candeeiro de pé
usando cilindros, cones e esferas. Compor uma cena com estes
objectos, esboçando primeiro em papel o grafo de cena
correspondente. Definir uma câmara fixa com uma vista de topo
sobre a cena utilizando uma projecção ortogonal que mostre toda
a cena. Tanto o esboço dos objectos como o do grafo de cena
devem ser apresentados no momento da avaliação.

2. A representação visual destes objectos deve alternar entre modelo
de arames e sólida usando a tecla ‘A’. Definir mais duas câmaras
fixas com vistas lateral e frontal utilizando sempre projecções
ortogonais. Para selecionar qual das câmaras está activa usam-se
as teclas ‘1’ a ‘3’.

3. Permitir ao utilizador movimentar a cadeira com o teclado
utilizando as teclas das setas para virar para esquerda ‘ ‘ e
direita ‘‘, assim com o para cima ‘’ ou para baixo ‘’. A cadeira
não deve atingir a velocidade máxima imediatamente após
pressionar a tecla ou parar quando se larga, mas sim acelerar e
desacelerar de forma natural. Ou seja, deve ter um movimento
uniformemente variado, considerando a velocidade e a aceleração
escalares, sendo a direcção do movimento dada por um vector
tridimensional. O cálculo da aceleração deve ter em consideração
que o utilizador pode carregar em várias teclas em simultâneo.
