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
    const roles = ["a Graphic Designer", "a UI/UX Enthusiast", "an Illustrator"];
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

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const clock = new THREE.Clock();

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
    };

    animate();
}
