// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // Optional: remove class to re-animate on scroll up
            // entry.target.classList.remove('show');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Typing animation
document.addEventListener("DOMContentLoaded", function() {
    const roles = ["a Graphic Designer", "a UI/UX Designer", "an Illustrator", "a Visual Artist", "a Vibe Coder"];
    let roleIndex = 0;
    let charIndex = 0;
    const typingTextElement = document.getElementById('typing-text');

    if (!typingTextElement) return;

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typingTextElement.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingTextElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        }
    }
    
    setTimeout(type, 500);

    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        window.addEventListener('mousemove', e => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const rotateX = ((mouseY - centerY) / centerY) * -10; // Max tilt 10deg
            const rotateY = ((mouseX - centerX) / centerX) * 10; // Max tilt 10deg
            
            profilePhoto.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
    }

    const portfolioItems = document.querySelectorAll('.portfolio-list-item');
    portfolioItems.forEach(item => {
        window.addEventListener('mousemove', e => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const rotateX = ((mouseY - centerY) / centerY) * -5;
            const rotateY = ((mouseX - centerX) / centerX) * 5;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

// Three.js Particle Background
if (window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BufferGeometry();
    const count = 150;
    const spacing = 6;
    const vertices = new Float32Array(count * count * 3);

    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            const x = (i - count / 2) * spacing;
            const y = (j - count / 2) * spacing;
            const z = 0;
            const index = (i * count + j) * 3;
            vertices[index] = x;
            vertices[index + 1] = y;
            vertices[index + 2] = z;
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0x555555,
        size: 1,
        sizeAttenuation: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 200;

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();

    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // For touch devices
    window.addEventListener('touchmove', (event) => {
        if (event.touches.length > 0) {
            mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    });

    // For scroll interaction on mobile/tablet
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 1024) {
            const scrollY = window.scrollY;
            camera.position.z = 200 - scrollY * 0.05;
            points.rotation.y = scrollY * 0.0005;
        } else {
            // Optional: reset on desktop if user resizes from mobile
            camera.position.z = 200;
        }
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const clock = new THREE.Clock();

    // Hero Object Scene
    let heroObject, heroObjectRenderer, heroObjectScene, heroObjectCamera;
    const heroObjectCanvas = document.querySelector('#hero-object-canvas');
    if (heroObjectCanvas) {
        heroObjectScene = new THREE.Scene();
        heroObjectCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        heroObjectRenderer = new THREE.WebGLRenderer({
            canvas: heroObjectCanvas,
            alpha: true
        });
        heroObjectRenderer.setSize(1300, 1300); // A bit larger
        heroObjectRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometry = new THREE.IcosahedronGeometry(36, 10); // A bit larger
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.25,
            sizeAttenuation: true
        });
        heroObject = new THREE.Points(geometry, material);
        heroObject.initialPosition = heroObject.geometry.attributes.position.clone();
        
        const velocities = new Float32Array(heroObject.initialPosition.count * 3);
        heroObject.geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        heroObjectScene.add(heroObject);
        heroObjectCamera.position.z = 120; // Adjust camera for new scale
    }

    const animate = () => {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();
        const positions = points.geometry.attributes.position.array;

        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, intersection);

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];

            const dx = x - intersection.x;
            const dy = y - intersection.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            const maxDist = 80;
            const power = Math.max(0, 1 - dist / maxDist);
            
            const offset = power * 30 * Math.sin(dist * 0.2 - elapsedTime);
            positions[i + 2] = offset;
        }
        points.geometry.attributes.position.needsUpdate = true;

        points.rotation.x = 0.2; // slight tilt
        renderer.render(scene, camera);

        // Animate and render hero object if it exists
        if (heroObject && heroObjectRenderer) {
            // heroObject.rotation.y += 0.001;
            heroObject.rotation.y += (mouse.x * 0.5 - heroObject.rotation.y) * 0.05;
            heroObject.rotation.x += (-mouse.y * 0.5 - heroObject.rotation.x) * 0.05;
            
            raycaster.setFromCamera(mouse, heroObjectCamera);
            const intersects = raycaster.intersectObject(heroObject);

            const positions = heroObject.geometry.attributes.position.array;
            const velocities = heroObject.geometry.attributes.velocity.array;
            const initialPos = heroObject.initialPosition.array;

            for (let i = 0; i < positions.length; i += 3) {
                const ix = i, iy = i + 1, iz = i + 2;

                const dxInitial = initialPos[ix] - positions[ix];
                const dyInitial = initialPos[iy] - positions[iy];
                const dzInitial = initialPos[iz] - positions[iz];

                velocities[ix] += dxInitial * 0.005;
                velocities[iy] += dyInitial * 0.005;
                velocities[iz] += dzInitial * 0.005;
                
                if (intersects.length > 0) {
                    const intersectPoint = intersects[0].point;
                    const dx = positions[ix] - intersectPoint.x;
                    const dy = positions[iy] - intersectPoint.y;
                    const dz = positions[iz] - intersectPoint.z;
                    const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                    
                    const repelRadius = 30; // Adjust interaction for new scale
                    if (dist < repelRadius) {
                        const repelForce = (repelRadius - dist) * 0.02;
                        velocities[ix] += (dx / dist) * repelForce;
                        velocities[iy] += (dy / dist) * repelForce;
                        velocities[iz] += (dz / dist) * repelForce;
                    }
                }

                velocities[ix] *= 0.96;
                velocities[iy] *= 0.96;
                velocities[iz] *= 0.96;
                
                positions[ix] += velocities[ix];
                positions[iy] += velocities[iy];
                positions[iz] += velocities[iz];
            }
            heroObject.geometry.attributes.position.needsUpdate = true;

            heroObjectRenderer.render(heroObjectScene, heroObjectCamera);
        }
    };

    animate();
}
