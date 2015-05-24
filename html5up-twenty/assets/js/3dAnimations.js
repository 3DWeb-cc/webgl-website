var colors = [0x645862, 0x998C79, 0x4C3C4C, 0x83776F];

(function () {

    var container = $('#banner');
    var HEIGHT = container.outerHeight();
    var WIDTH = container.width();
    var renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0007);
    renderer.setClearColor(0x000000, 0);


    renderer.setSize(WIDTH, HEIGHT);
    $(renderer.domElement).css({
        position: 'absolute',
        left: 0,
        top: 0
    });
    container.prepend(renderer.domElement);

    var
        particleCount = 2000,
        particles = new THREE.Geometry();

    for (var p = 0; p < particleCount; p++) {

        // create a particle with random
        // position values, -250 -> 250
        var pX = Math.random() * 500 - 250,
            pY = Math.random() * 500 - 250,
            pZ = Math.random() * 500 - 250,
            particle = new THREE.Vector3(pX, pY, pZ);

        particle.velocity = new THREE.Vector3(
            0,              // x
            -Math.random(), // y: random vel
            0);             // z

        // add it to the geometry
        particles.vertices.push(particle);


    }

    // now create the individual particles
    /*
     parameters = [
     [[1, 1, 0.5], 5],
     [[0.95, 1, 0.5], 4],
     [[0.90, 1, 0.5], 3],
     [[0.85, 1, 0.5], 2],
     [[0.80, 1, 0.5], 1]
     ];
     */

    var colors = [0x645862, 0x998C79, 0x4C3C4C, 0x83776F];


    var materials = [];

    sprite1 = THREE.ImageUtils.loadTexture("assets/textures/snowflake1.png");
    sprite2 = THREE.ImageUtils.loadTexture("assets/textures/snowflake2.png");
    sprite3 = THREE.ImageUtils.loadTexture("assets/textures/snowflake3.png");
    sprite4 = THREE.ImageUtils.loadTexture("assets/textures/snowflake4.png");
    sprite5 = THREE.ImageUtils.loadTexture("assets/textures/snowflake5.png");

    parameters = [
        [0x645862, 3, sprite1],
        [0x998C79, 2, sprite2],
        [0x4C3C4C, 3, sprite3],
        [0x83776F, 1, sprite4]
        /*[[0.6, 0.55, 0.47], 5],
         [[0.39, 0.35, 0.39], 4],
         [[0.3, 0.3, 0.24], 3],
         [[0.25, 0.47, 0.44], 2]*/
    ];

    for (i = 0; i < parameters.length; i++) {

        color = parameters[i][0];
        size = parameters[i][1];
        sprite = parameters[i][2];

        materials[i] = new THREE.PointCloudMaterial({
            size: size,
            map: sprite,
            //blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });

        /*
         materials[i] = new THREE.PointCloudMaterial({
         color: color,
         size: size
         });
         */

        console.log(materials[i].color)

        var theCloud = new THREE.PointCloud(particles, materials[i]);

        theCloud.rotation.y = Math.random() * 6;
        theCloud.rotation.x = Math.random() * 6;
        theCloud.rotation.z = Math.random() * 6;

        scene.add(theCloud);

    }


    function animate() {
        //particleSystem.rotation.y += 0.01;
        var time = Date.now() * 0.00001;

        //camera.position += 0.01
        camera.position.z += 0.01

        camera.lookAt(scene.position);

        for (i = 0; i < scene.children.length; i++) {

            var object = scene.children[i];

            if (object instanceof THREE.PointCloud) {

                object.rotation.x = time * ( i < 4 ? i + 1 : -( i + 1 ) );

            }

        }


        /*
         for ( i = 0; i < materials.length; i ++ ) {

         color = parameters[i][0];

         h = ( 360 * ( color[0] + time ) % 360 ) / 360;
         materials[i].color.setHSL( h, color[1], color[2] );

         }
         */

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();