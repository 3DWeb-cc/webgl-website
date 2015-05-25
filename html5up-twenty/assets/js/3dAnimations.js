(function () {
    'use strict';

    var particles, pX, pY, pZ, particle, sprite1, sprite2, sprite3, sprite4, sprite5, parameters, color, sprite, theCloud, size, doit;
    var materials = [];
    var particleCount = 2000;
    var container = $('#banner');
    var HEIGHT = container.outerHeight();
    var WIDTH = container.width();
    var renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.006);
    //renderer.setClearColor(0xffffff, 0);

    /**
     * Hopefully, in 600ms window resize could be reasonably considered done
     */
    $(window).resize(function (evt) {
        clearTimeout(doit);
        doit = setTimeout(function () {
          HEIGHT = container.outerHeight();
          WIDTH = container.width();
          camera.aspect = WIDTH / HEIGHT;
          camera.updateProjectionMatrix();

          renderer.setSize( WIDTH, HEIGHT );
        }, 600);
    });


    renderer.setSize(WIDTH, HEIGHT);
    $(renderer.domElement).css({
        position: 'absolute',
        left: 0,
        top: 0
    });
    container.prepend(renderer.domElement);

    particles = new THREE.Geometry();

    for (var p = 0; p < particleCount; p++) {

        // create a particle with random
        // position values, -250 -> 250
        pX = Math.random() * 500 - 250;
        pY = Math.random() * 500 - 250;
        pZ = Math.random() * 500 - 250;
        particle = new THREE.Vector3(pX, pY, pZ);

        // add it to the geometry
        particles.vertices.push(particle);

    }

    // snowflakes by http://en.wikipedia.org/wiki/File:Sketch_of_snow_crystal_by_Ren%C3%A9_Descartes.jpg
    sprite1 = THREE.ImageUtils.loadTexture("assets/textures/snowflake1.png");
    sprite2 = THREE.ImageUtils.loadTexture("assets/textures/snowflake2.png");
    sprite3 = THREE.ImageUtils.loadTexture("assets/textures/snowflake3.png");
    sprite4 = THREE.ImageUtils.loadTexture("assets/textures/snowflake4.png");
    sprite5 = THREE.ImageUtils.loadTexture("assets/textures/snowflake5.png");

    parameters = [
        [0x645862, 3, sprite1],
        [0x998C79, 2, sprite2],
        [0x4C3C4C, 3, sprite3],
        [0x83776F, 1, sprite4],
        [0x4C3C4C, 3, sprite5]
    ];

    for (var i = 0; i < parameters.length; i++) {

        color = parameters[i][0];
        size = parameters[i][1];
        sprite = parameters[i][2];

        materials[i] = new THREE.PointCloudMaterial({
            size: size,
            map: sprite,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });

        theCloud = new THREE.PointCloud(particles, materials[i]);

        theCloud.rotation.y = Math.random() * 6;
        theCloud.rotation.x = Math.random() * 6;
        theCloud.rotation.z = Math.random() * 6;

        scene.add(theCloud);

    }


    function animate() {

        var object, time = Date.now() * 0.00001;

        //camera.position += 0.01
        camera.position.z += 0.01

        camera.lookAt(scene.position);

        for (var i = 0; i < scene.children.length; i++) {

            object = scene.children[i];

            if (object instanceof THREE.PointCloud) {

                object.rotation.x = time * ( i < 4 ? i + 1 : -( i + 1 ) );

            }

        }

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();