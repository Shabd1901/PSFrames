// ============================================
// THE LIVING GALLERY - JavaScript Logic
// ============================================

// Gallery data structure in localStorage:
// {
//   "2025-10-29": {
//     "event": "Diwali Night",
//     "photos": ["base64data1", "base64data2"]
//   }
// }

const STORAGE_KEY = "livingGalleryData"

// DOM Elements
const addPhotosBtn = document.getElementById("addPhotosBtn")
const addPhotosModal = document.getElementById("addPhotosModal")
const closeModalBtn = document.getElementById("closeModalBtn")
const addPhotosForm = document.getElementById("addPhotosForm")
const eventDateInput = document.getElementById("eventDate")
const galleryContainer = document.getElementById("galleryContainer")
const dateNavigator = document.getElementById("dateNavigator")
const clearAllBtn = document.getElementById("clearAllBtn")
const lightbox = document.getElementById("lightbox")
const closeLightboxBtn = document.getElementById("closeLightboxBtn")
const lightboxImage = document.getElementById("lightboxImage")
const lightboxPrev = document.getElementById("lightboxPrev")
const lightboxNext = document.getElementById("lightboxNext")
const lightboxCounter = document.getElementById("lightboxCounter")

// State for lightbox navigation
let currentLightboxPhotos = []
let currentPhotoIndex = 0

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Set today's date as default in date picker
  const today = new Date().toISOString().split("T")[0]
  eventDateInput.value = today

  // Load and render gallery from localStorage
  renderGallery()

  // Setup intersection observer for date navigator highlighting
  setupIntersectionObserver()
})

// ============================================
// EVENT LISTENERS
// ============================================

// Add Photos Button
addPhotosBtn.addEventListener("click", () => {
  addPhotosModal.classList.add("active")
})

// Close Modal
closeModalBtn.addEventListener("click", () => {
  addPhotosModal.classList.remove("active")
})

// Close modal when clicking outside
addPhotosModal.addEventListener("click", (e) => {
  if (e.target === addPhotosModal) {
    addPhotosModal.classList.remove("active")
  }
})

// Form Submission
addPhotosForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const date = eventDateInput.value
  const eventName = document.getElementById("eventName").value
  const photoFiles = document.getElementById("photoUpload").files

  if (!date || !eventName || photoFiles.length === 0) {
    alert("Please fill in all fields")
    return
  }

  // Convert images to base64 and save
  const photos = []
  for (const file of photoFiles) {
    const base64 = await fileToBase64(file)
    photos.push(base64)
  }

  // Save to localStorage
  savePhotosToStorage(date, eventName, photos)

  // Reset form and close modal
  addPhotosForm.reset()
  eventDateInput.value = new Date().toISOString().split("T")[0]
  addPhotosModal.classList.remove("active")

  // Re-render gallery
  renderGallery()
})

// Clear All Button
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all photos? This cannot be undone.")) {
    localStorage.removeItem(STORAGE_KEY)
    renderGallery()
  }
})

// Lightbox Navigation
closeLightboxBtn.addEventListener("click", () => {
  lightbox.classList.remove("active")
})

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active")
  }
})

lightboxPrev.addEventListener("click", () => {
  currentPhotoIndex = (currentPhotoIndex - 1 + currentLightboxPhotos.length) % currentLightboxPhotos.length
  updateLightboxImage()
})

lightboxNext.addEventListener("click", () => {
  currentPhotoIndex = (currentPhotoIndex + 1) % currentLightboxPhotos.length
  updateLightboxImage()
})

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return

  if (e.key === "ArrowLeft") lightboxPrev.click()
  if (e.key === "ArrowRight") lightboxNext.click()
  if (e.key === "Escape") closeLightboxBtn.click()
})

// ============================================
// STORAGE FUNCTIONS
// ============================================

function savePhotosToStorage(date, eventName, photos) {
  const galleryData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}

  if (!galleryData[date]) {
    galleryData[date] = { event: eventName, photos: [] }
  }

  // Add new photos to existing date
  galleryData[date].photos.push(...photos)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(galleryData))
}

function getGalleryData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

function renderGallery() {
  const galleryData = getGalleryData()
  const sortedDates = Object.keys(galleryData).sort().reverse()

  // Clear containers
  galleryContainer.innerHTML = ""
  dateNavigator.innerHTML = ""

  if (sortedDates.length === 0) {
    galleryContainer.innerHTML =
      '<div style="text-align: center; padding: 3rem; color: #999;">No photos yet. Click the + button to add your first photos!</div>'
    return
  }

  // Render each date section
  sortedDates.forEach((date) => {
    const { event, photos } = galleryData[date]
    renderSection(date, event, photos)
    renderDateNavItem(date, event)
  })
}

function renderSection(date, eventName, photos) {
  if (photos.length === 0) return

  const section = document.createElement("section")
  section.className = "gallery-section"
  section.id = `section-${date}`

  // Background with first photo (blurred)
  const bgDiv = document.createElement("div")
  bgDiv.className = "section-background"
  bgDiv.style.backgroundImage = `url('${photos[0]}')`

  // Section header
  const header = document.createElement("div")
  header.className = "section-header"
  header.innerHTML = `
        <div class="date">📅 ${formatDate(date)}</div>
        <div class="event-name">${eventName}</div>
    `

  // Photo grid
  const grid = document.createElement("div")
  grid.className = "photo-grid"

  photos.forEach((photoBase64, index) => {
    const photoItem = document.createElement("div")
    photoItem.className = "photo-item"

    const img = document.createElement("img")
    img.src = photoBase64
    img.alt = `${eventName} - Photo ${index + 1}`

    // Click to open lightbox
    photoItem.addEventListener("click", () => {
      openLightbox(photos, index)
    })

    photoItem.appendChild(img)
    grid.appendChild(photoItem)
  })

  section.appendChild(bgDiv)
  section.appendChild(header)
  section.appendChild(grid)
  galleryContainer.appendChild(section)
}

function renderDateNavItem(date, eventName) {
  const navItem = document.createElement("button")
  navItem.className = "date-nav-item"
  navItem.textContent = formatDate(date)
  navItem.id = `nav-${date}`

  navItem.addEventListener("click", () => {
    const section = document.getElementById(`section-${date}`)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  })

  dateNavigator.appendChild(navItem)
}

// ============================================
// LIGHTBOX FUNCTIONS
// ============================================

function openLightbox(photos, index) {
  currentLightboxPhotos = photos
  currentPhotoIndex = index
  lightbox.classList.add("active")
  updateLightboxImage()
}

function updateLightboxImage() {
  lightboxImage.src = currentLightboxPhotos[currentPhotoIndex]
  lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${currentLightboxPhotos.length}`
}

// ============================================
// INTERSECTION OBSERVER - Highlight current date
// ============================================

function setupIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const date = sectionId.replace("section-", "")

          // Update active nav item
          document.querySelectorAll(".date-nav-item").forEach((item) => {
            item.classList.remove("active")
          })

          const activeNavItem = document.getElementById(`nav-${date}`)
          if (activeNavItem) {
            activeNavItem.classList.add("active")
            // Scroll nav into view if needed
            activeNavItem.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }
        }
      })
    },
    {
      threshold: 0.3,
    },
  )

  // Observe all sections
  document.querySelectorAll(".gallery-section").forEach((section) => {
    observer.observe(section)
  })
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", options)
}
