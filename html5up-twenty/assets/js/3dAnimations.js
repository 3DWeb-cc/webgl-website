(function () {

    var container = $('#banner');
    var HEIGHT = container.outerHeight();
    var WIDTH = container.width();
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);

    renderer.setSize(WIDTH, HEIGHT);
    $(renderer.domElement).css({
        position: 'absolute',
        left: 0,
        top: 0
    });
    container.prepend(renderer.domElement);

    var
        particleCount = 1000,
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
    parameters = [
        [[1, 1, 0.5], 5],
        [[0.95, 1, 0.5], 4],
        [[0.90, 1, 0.5], 3],
        [[0.85, 1, 0.5], 2],
        [[0.80, 1, 0.5], 1]
    ];

    var materials = [];

    for (i = 0; i < parameters.length; i++) {

        color = parameters[i][0];
        size = parameters[i][1];

        materials[i] = new THREE.PointCloudMaterial({size: size});

        var theCloud = new THREE.PointCloud(particles, materials[i]);

        theCloud.rotation.y = Math.random() * 6;
        theCloud.rotation.x = Math.random() * 6;
        theCloud.rotation.z = Math.random() * 6;

        scene.add(theCloud);

    }


    function animate() {
        //particleSystem.rotation.y += 0.01;
        var time = Date.now() * 0.00005;

        /*
                var pCount = particleCount;
                while (pCount--) {

                    // get the particle
                    var particle =
                        particles.vertices[pCount];

                    // update the velocity with
                    // a splat of randomniz
                    particle.velocity.y -= Math.random() * .1;

                    // and the position
                    particle.add(
                        particle.velocity);

                }
        */

        for ( i = 0; i < scene.children.length; i ++ ) {

            var object = scene.children[ i ];

            if ( object instanceof THREE.PointCloud ) {

                object.rotation.x = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

            }

        }


        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();