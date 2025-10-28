"use client"

export default function Home() {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
          color: #1a1a1a;
          min-height: 100vh;
        }

        .container {
          display: flex;
          min-height: 100vh;
          position: relative;
        }

        .gallery-main {
          flex: 1;
          overflow-y: auto;
          padding: 40px 60px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 60px;
          animation: fadeIn 0.8s ease-out;
        }

        .gallery-header h1 {
          font-size: 3.5rem;
          font-weight: 300;
          letter-spacing: -1px;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gallery-header p {
          font-size: 1.1rem;
          color: #64748b;
          font-weight: 300;
        }

        .empty-state {
          text-align: center;
          padding: 80px 40px;
          color: #94a3b8;
        }

        .empty-state h2 {
          font-size: 1.8rem;
          margin-bottom: 12px;
          color: #64748b;
        }

        .empty-state p {
          font-size: 1rem;
          margin-bottom: 24px;
        }

        .timeline-section {
          margin-bottom: 80px;
          animation: slideUp 0.6s ease-out;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
        }

        .section-date {
          font-size: 1.8rem;
          font-weight: 600;
          color: #0f172a;
          min-width: 200px;
        }

        .section-event {
          font-size: 1rem;
          color: #64748b;
          font-weight: 300;
        }

        .photos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .photo-card {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          aspect-ratio: 1;
          cursor: pointer;
          background: #f1f5f9;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .photo-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .photo-card:hover img {
          transform: scale(1.05);
        }

        .photo-delete {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.6);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.2s;
        }

        .photo-card:hover .photo-delete {
          opacity: 1;
        }

        .photo-delete:hover {
          background: rgba(220, 38, 38, 0.8);
        }

        .add-button {
          position: fixed;
          bottom: 40px;
          right: 40px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          border: none;
          font-size: 32px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        .add-button:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.4);
        }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-out;
        }

        .modal.active {
          display: flex;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 40px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease-out;
        }

        .modal-header {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 24px;
          color: #0f172a;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.95rem;
          font-weight: 500;
          margin-bottom: 8px;
          color: #334155;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #0f172a;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-buttons {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .btn {
          flex: 1;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(15, 23, 42, 0.3);
        }

        .btn-secondary {
          background: #e2e8f0;
          color: #0f172a;
        }

        .btn-secondary:hover {
          background: #cbd5e1;
        }

        .lightbox {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 2000;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-out;
        }

        .lightbox.active {
          display: flex;
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 8px;
        }

        .lightbox-info {
          color: white;
          margin-top: 20px;
          text-align: center;
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 32px;
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .lightbox-prev {
          left: 20px;
        }

        .lightbox-next {
          right: 20px;
        }

        .sidebar {
          width: 200px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          padding: 40px 20px;
          overflow-y: auto;
          border-left: 1px solid #e2e8f0;
          position: fixed;
          right: 0;
          top: 0;
          height: 100vh;
          display: none;
        }

        .sidebar.active {
          display: block;
        }

        .sidebar-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .date-link {
          display: block;
          padding: 10px 12px;
          margin-bottom: 8px;
          border-radius: 6px;
          color: #475569;
          text-decoration: none;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          border-left: 3px solid transparent;
        }

        .date-link:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .date-link.active {
          background: #e0e7ff;
          color: #0f172a;
          border-left-color: #0f172a;
          font-weight: 600;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .gallery-main {
            padding: 20px;
          }

          .gallery-header h1 {
            font-size: 2rem;
          }

          .photos-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
          }

          .add-button {
            bottom: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
            font-size: 28px;
          }

          .sidebar {
            display: none !important;
          }
        }
      `}</style>

      <div className="container">
        <div className="gallery-main">
          <div className="gallery-header">
            <h1>The Living Gallery</h1>
            <p>A timeline of moments, preserved in time</p>
          </div>
          <div id="gallery-content"></div>
        </div>

        <div className="sidebar" id="sidebar">
          <div className="sidebar-title">Jump to Date</div>
          <div id="date-links"></div>
        </div>

        <button className="add-button" id="addBtn">
          +
        </button>

        <div className="modal" id="addModal">
          <div className="modal-content">
            <div className="modal-header">Add Photo</div>
            <form id="photoForm">
              <div className="form-group">
                <label>Date</label>
                <input type="date" id="photoDate" required />
              </div>
              <div className="form-group">
                <label>Event Name</label>
                <input type="text" id="photoEvent" placeholder="e.g., Summer Vacation" />
              </div>
              <div className="form-group">
                <label>Photo</label>
                <input type="file" id="photoFile" accept="image/*" required />
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn btn-primary">
                  Add Photo
                </button>
                <button type="button" className="btn btn-secondary" id="closeModal">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lightbox" id="lightbox">
          <div className="lightbox-content">
            <button className="lightbox-close" id="closeLightbox">
              &times;
            </button>
            <button className="lightbox-nav lightbox-prev" id="prevPhoto">
              &lt;
            </button>
            <img id="lightboxImage" className="lightbox-image" alt="Full view" />
            <button className="lightbox-nav lightbox-next" id="nextPhoto">
              &gt;
            </button>
            <div className="lightbox-info">
              <div id="lightboxDate"></div>
              <div id="lightboxEvent"></div>
            </div>
          </div>
        </div>
      </div>

      <script>{`
        let photos = [];
        let currentLightboxIndex = 0;
        let allPhotosFlat = [];

        // Load photos from localStorage
        function loadPhotos() {
          const stored = localStorage.getItem('galleryPhotos');
          photos = stored ? JSON.parse(stored) : [];
          renderGallery();
        }

        // Save photos to localStorage
        function savePhotos() {
          localStorage.setItem('galleryPhotos', JSON.stringify(photos));
        }

        function createFlatPhotoArray() {
          allPhotosFlat = [];
          const grouped = {};
          photos.forEach(photo => {
            if (!grouped[photo.date]) {
              grouped[photo.date] = [];
            }
            grouped[photo.date].push(photo);
          });

          const sortedDates = Object.keys(grouped).sort().reverse();
          sortedDates.forEach(date => {
            allPhotosFlat.push(...grouped[date]);
          });
        }

        // Render gallery
        function renderGallery() {
          const content = document.getElementById('gallery-content');
          content.innerHTML = '';

          if (photos.length === 0) {
            content.innerHTML = \`
              <div class="empty-state">
                <h2>No photos yet</h2>
                <p>Click the + button to add your first photo to the timeline</p>
              </div>
            \`;
            document.getElementById('sidebar').classList.remove('active');
            return;
          }

          const grouped = {};
          photos.forEach(photo => {
            if (!grouped[photo.date]) {
              grouped[photo.date] = [];
            }
            grouped[photo.date].push(photo);
          });

          const sortedDates = Object.keys(grouped).sort().reverse();

          sortedDates.forEach(date => {
            const section = document.createElement('div');
            section.className = 'timeline-section';
            section.id = 'date-' + date;

            const header = document.createElement('div');
            header.className = 'section-header';
            header.innerHTML = \`
              <div class="section-date">\${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div class="section-event">\${grouped[date][0].event || 'Memories'}</div>
            \`;

            const grid = document.createElement('div');
            grid.className = 'photos-grid';

            grouped[date].forEach((photo, idx) => {
              const card = document.createElement('div');
              card.className = 'photo-card';
              
              const photoIndex = allPhotosFlat.indexOf(photo);
              card.innerHTML = \`
                <img src="\${photo.src}" alt="Photo" />
                <button class="photo-delete" data-index="\${photos.indexOf(photo)}" title="Delete photo">×</button>
              \`;
              
              card.querySelector('img').onclick = () => openLightbox(photoIndex);
              card.querySelector('.photo-delete').onclick = (e) => {
                e.stopPropagation();
                deletePhoto(photos.indexOf(photo));
              };
              
              grid.appendChild(card);
            });

            section.appendChild(header);
            section.appendChild(grid);
            content.appendChild(section);
          });

          createFlatPhotoArray();
          updateSidebar(sortedDates);
        }

        function deletePhoto(index) {
          if (confirm('Delete this photo?')) {
            photos.splice(index, 1);
            savePhotos();
            renderGallery();
            if (document.getElementById('lightbox').classList.contains('active')) {
              document.getElementById('lightbox').classList.remove('active');
            }
          }
        }

        // Update sidebar with date links
        function updateSidebar() {
          const links = document.getElementById('date-links');
          links.innerHTML = '';

          const grouped = {};
          photos.forEach(photo => {
            if (!grouped[photo.date]) {
              grouped[photo.date] = photo;
            }
          });

          Object.keys(grouped).sort().reverse().forEach(date => {
            const link = document.createElement('a');
            link.className = 'date-link';
            link.textContent = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            link.onclick = (e) => {
              e.preventDefault();
              document.getElementById('date-' + date).scrollIntoView({ behavior: 'smooth' });
              updateActiveDateLink();
            };
            links.appendChild(link);
          });

          if (photos.length > 0) {
            document.getElementById('sidebar').classList.add('active');
          }
        }

        // Update active date link
        function updateActiveDateLink() {
          const links = document.querySelectorAll('.date-link');
          links.forEach(link => link.classList.remove('active'));

          const sections = document.querySelectorAll('.timeline-section');
          sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2) {
              const date = section.id.replace('date-', '');
              const link = Array.from(links).find(l => 
                l.textContent === new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              );
              if (link) link.classList.add('active');
            }
          });
        }

        function openLightbox(photoIndex) {
          if (allPhotosFlat.length === 0) return;
          
          currentLightboxIndex = photoIndex;
          const photo = allPhotosFlat[currentLightboxIndex];

          document.getElementById('lightboxImage').src = photo.src;
          document.getElementById('lightboxDate').textContent = new Date(photo.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          document.getElementById('lightboxEvent').textContent = photo.event || 'Memory';
          document.getElementById('lightbox').classList.add('active');
        }

        function closeAddModal() {
          document.getElementById('addModal').classList.remove('active');
        }

        function closeLightboxModal() {
          document.getElementById('lightbox').classList.remove('active');
        }

        // Event listeners
        document.getElementById('addBtn').onclick = () => {
          document.getElementById('addModal').classList.add('active');
          document.getElementById('photoDate').valueAsDate = new Date();
        };

        document.getElementById('closeModal').onclick = closeAddModal;

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            closeAddModal();
            closeLightboxModal();
          }
        });

        document.getElementById('addModal').onclick = (e) => {
          if (e.target.id === 'addModal') {
            closeAddModal();
          }
        };

        document.getElementById('lightbox').onclick = (e) => {
          if (e.target.id === 'lightbox') {
            closeLightboxModal();
          }
        };

        document.getElementById('closeLightbox').onclick = closeLightboxModal;

        document.getElementById('photoForm').onsubmit = (e) => {
          e.preventDefault();
          const file = document.getElementById('photoFile').files[0];
          
          if (!file) {
            alert('Please select a photo');
            return;
          }

          const reader = new FileReader();

          reader.onload = (event) => {
            photos.push({
              date: document.getElementById('photoDate').value,
              event: document.getElementById('photoEvent').value,
              src: event.target.result
            });

            savePhotos();
            renderGallery();
            closeAddModal();
            document.getElementById('photoForm').reset();
          };

          reader.readAsDataURL(file);
        };

        document.getElementById('prevPhoto').onclick = () => {
          currentLightboxIndex = (currentLightboxIndex - 1 + allPhotosFlat.length) % allPhotosFlat.length;
          const photo = allPhotosFlat[currentLightboxIndex];
          document.getElementById('lightboxImage').src = photo.src;
          document.getElementById('lightboxDate').textContent = new Date(photo.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          document.getElementById('lightboxEvent').textContent = photo.event || 'Memory';
        };

        document.getElementById('nextPhoto').onclick = () => {
          currentLightboxIndex = (currentLightboxIndex + 1) % allPhotosFlat.length;
          const photo = allPhotosFlat[currentLightboxIndex];
          document.getElementById('lightboxImage').src = photo.src;
          document.getElementById('lightboxDate').textContent = new Date(photo.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          document.getElementById('lightboxEvent').textContent = photo.event || 'Memory';
        };

        document.addEventListener('keydown', (e) => {
          if (!document.getElementById('lightbox').classList.contains('active')) return;
          
          if (e.key === 'ArrowLeft') {
            document.getElementById('prevPhoto').click();
          } else if (e.key === 'ArrowRight') {
            document.getElementById('nextPhoto').click();
          }
        });

        window.addEventListener('scroll', updateActiveDateLink);

        // Initialize
        loadPhotos();
      `}</script>
    </>
  )
}
