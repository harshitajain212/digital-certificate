document.addEventListener('DOMContentLoaded', () => {
    // Certificate data
    const certificateData = {
        name: "Priyanshu Nishant",
        course: "How to be a Successful Business Analyst",
        issuedBy: "upGrad Education Private Limited",
        aboutCourse: "This course offers a practical approach to becoming a successful Business Analyst. Participants gain hands-on experience with tools and techniques to bridge business challenges and technical solutions effectively.",
        eventStartDate: "01-Sep-2023",
        eventEndDate: "20-Oct-2023",
        issuedOn: "23-Oct-2023",
        expiryDate: "23-Oct-2026",
        skills: ["Python", "Data Science", "Teach"],
        certificateImage: "certificate-image.jpeg",
        organization: {
            name: "upGrad Education Private Limited",
            address: "Nishuvi, Ground Floor - 75, Dr. Annie Besant Road, Worli, Mumbai - 400018"
        }
    };

    // DOM Elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-btn');
    const logo = document.getElementById('logo');
    const certificate = document.getElementById('certificate');

    // Populate certificate information
    function populateCertificateInfo() {
        document.getElementById('issuedTo').textContent = certificateData.name;
        document.getElementById('issuedBy').textContent = certificateData.issuedBy;
        document.getElementById('startDate').textContent = certificateData.eventStartDate;
        document.getElementById('endDate').textContent = certificateData.eventEndDate;
        document.getElementById('issueDate').textContent = certificateData.issuedOn;
        document.getElementById('expiryDate').textContent = certificateData.expiryDate;
        document.getElementById('courseDescription').textContent = certificateData.aboutCourse;
        document.getElementById('orgName').textContent = certificateData.organization.name;
        document.getElementById('orgAddress').textContent = certificateData.organization.address;

        // Populate skills
        const skillsList = document.getElementById('skillsList');
        skillsList.innerHTML = certificateData.skills
            .map(skill => `<span class="skill-badge">${skill}</span>`)
            .join('');
    }

    // Modal functions
    function showImage(imgSrc) {
        modal.style.display = 'block';
        modalImg.src = imgSrc;
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // Event Listeners
    logo.addEventListener('click', () => showImage(logo.src));
    certificate.addEventListener('click', () => showImage(certificate.src));
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Download handler
    document.getElementById('download-btn').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = certificateData.certificateImage;
        link.download = `${certificateData.name}-${certificateData.course}-Certificate.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // LinkedIn share handler
    document.getElementById('linkedin-btn').addEventListener('click', () => {
        const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME
            &name=${encodeURIComponent(certificateData.course)}
            &organizationName=${encodeURIComponent(certificateData.issuedBy)}
            &issueYear=${new Date(certificateData.issuedOn).getFullYear()}
            &issueMonth=${new Date(certificateData.issuedOn).getMonth() + 1}
            &expirationYear=${new Date(certificateData.expiryDate).getFullYear()}
            &expirationMonth=${new Date(certificateData.expiryDate).getMonth() + 1}`;
        window.open(linkedInUrl.replace(/\s+/g, ''), '_blank');
    });

    // Share handler
    document.getElementById('share-btn').addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: `${certificateData.name}'s ${certificateData.course} Certificate`,
                text: `Check out my certificate for ${certificateData.course} from ${certificateData.issuedBy}\n\nIssued on: ${certificateData.issuedOn}\nSkills: ${certificateData.skills.join(', ')}`,
                url: window.location.href
            });
        } else {
            const shareUrl = window.location.href;
            navigator.clipboard.writeText(shareUrl);
            alert('Certificate link copied to clipboard!');
        }
    });

    // Initialize the page
    populateCertificateInfo();
});