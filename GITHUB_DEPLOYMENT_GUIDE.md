# 📚 GitHub Deployment & Mobile Testing Guide
## MTs Al Falahiyyah Rajeg Website

---

## 🔧 Step 1: Initialize Git Repository (If Not Already Done)

### On Windows PowerShell:

```powershell
cd "f:\FAZRI\MTsAlFalahiyyahRajeg-main"
git init
git add .
git commit -m "Initial commit: Responsive website with all responsive fixes applied"
```

---

## 📤 Step 2: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new
2. **Create New Repository:**
   - Repository name: `MTsAlFalahiyyahRajeg-main` (or your preferred name)
   - Description: "Responsive school website for MTs Al Falahiyyah Rajeg"
   - Public (so it's accessible)
   - DO NOT initialize with README (you already have files)
   - Click "Create repository"

---

## 🔗 Step 3: Connect Local to GitHub

### Copy the commands GitHub shows you and run in PowerShell:

```powershell
cd "f:\FAZRI\MTsAlFalahiyyahRajeg-main"

# Add GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/MTsAlFalahiyyahRajeg-main.git

# Rename branch if needed (GitHub uses 'main' by default now)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

---

## 📱 Step 4: Enable GitHub Pages (For Public Access)

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Select branch: `main`
   - Select folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for GitHub to build
7. Your site will be available at:
   - `https://YOUR-USERNAME.github.io/MTsAlFalahiyyahRajeg-main/`

---

## 🧪 Step 5: Test on Your Smartphone

### Option A: Testing on Same Network
1. Find your GitHub Pages URL (from Step 4)
2. On your phone's browser, type the URL
3. Website will load and display

### Option B: Testing Mobile Responsiveness Locally First

**On Your Computer (DevTools):**
1. Right-click webpage → Inspect (or F12)
2. Click Device Toolbar icon (Ctrl+Shift+M)
3. Select device type:
   - iPhone 12 (375px)
   - iPhone SE (375px)
   - Pixel 5 (393px)
   - iPad (768px)
   - iPad Pro (1024px)
4. Test all interactive features:
   - Tap hamburger menu ☰
   - Tap each menu item
   - Check if text is readable
   - Verify images load
   - Test form on registration page
   - Check gallery images

---

## ✅ Mobile Testing Checklist

### Menu & Navigation
- [ ] Hamburger menu appears on mobile
- [ ] Hamburger menu opens when clicked
- [ ] Menu slides in from left
- [ ] All menu items visible: Branda, Pendaftaran, Kegiatan, Tentang
- [ ] Tapping menu item navigates to page
- [ ] Menu closes after clicking item
- [ ] Menu closes when clicking outside
- [ ] Menu closes with Escape key

### Content Display
- [ ] No horizontal scrolling
- [ ] Text is readable (not too small)
- [ ] Images display properly
- [ ] Buttons are clickable (large enough)
- [ ] All sections properly spaced

### Specific Pages

#### **index.html (Branda/Home)**
- [ ] Hero image displays and is responsive
- [ ] "Daftar Sekarang" button works
- [ ] Program cards stack vertically
- [ ] Tips section is readable
- [ ] Footer links work

#### **form.html (Pendaftaran)**
- [ ] Registration info displays
- [ ] Google Forms link opens
- [ ] All contact info visible
- [ ] Registration schedule clear
- [ ] Document requirements listed

#### **gallery.html (Kegiatan)**
- [ ] All 6 gallery items visible (Pramuka, Hadroh, Futsal, Tilawah, Pildacil, OSIS)
- [ ] Images load properly
- [ ] Descriptions are readable
- [ ] Gallery stacks correctly on mobile

#### **about.html (Tentang)**
- [ ] Profile text readable
- [ ] Vision/Mission boxes display
- [ ] History section complete
- [ ] Contact info grid readable:
  - Address visible
  - Phone number: 085820000132
  - Email: mtsalfalahiyyah.official@gmail.com
  - Hours: 13:00 - 17:00

### Performance
- [ ] Pages load quickly
- [ ] No broken images
- [ ] No console errors (Open DevTools)
- [ ] Smooth animations
- [ ] No lag when scrolling

---

## 🔄 Step 6: Making Updates & Pushing to GitHub

After making changes locally:

```powershell
cd "f:\FAZRI\MTsAlFalahiyyahRajeg-main"

# Check what changed
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Update: Fixed responsive design issues on mobile"

# Push to GitHub
git push origin main
```

**GitHub Pages will automatically update within 1-2 minutes!**

---

## 🐛 Troubleshooting

### Problem: Menu not showing on GitHub but works locally

**Solution:**
1. Hard refresh: Ctrl+F5 (or Cmd+Shift+R on Mac)
2. Clear cache: Press Ctrl+Shift+Delete
3. Wait 2-3 minutes for GitHub Pages to rebuild
4. Test in incognito/private window

### Problem: Images not loading

**Check:**
1. Image file paths in HTML (should be: `images/FILENAME.jpeg`)
2. Image files exist in `/images/` folder
3. File names match exactly (case-sensitive on GitHub)
4. GitHub has permission to access images

### Problem: Website looks different on phone vs. computer

**Check:**
1. Zoom is at 100% (Ctrl+0 to reset)
2. Viewport meta tag is correct
3. Browser is not zoomed in/out
4. Rotation is correct (portrait/landscape)
5. Try different browser on phone

### Problem: Hamburger menu not responding

**Fix:**
1. Check browser console for errors (DevTools F12)
2. Ensure `script.js` is linked in HTML
3. Check network tab - all resources loading?
4. Try clearing cache and hard refresh

---

## 📊 Performance Tips for Mobile

Your site is already optimized with:
- ✅ Lazy loading images
- ✅ Mobile-first CSS
- ✅ Touch-friendly buttons (44px minimum)
- ✅ Smooth animations
- ✅ Responsive layout

**Keep performance good by:**
1. Compressing images before uploading
2. Not adding heavy JavaScript libraries
3. Keeping CSS organized and minimal
4. Testing on actual devices regularly

---

## 🌐 Sharing Your Website

Once deployed on GitHub Pages, you can share:
- **Full URL:** `https://YOUR-USERNAME.github.io/MTsAlFalahiyyahRajeg-main/`
- **QR Code:** Generate from URL at https://qr-code-generator.com/
- **Short URL:** Use bit.ly or tinyurl.com

---

## 📞 Support

### If menu/responsiveness issues persist:

1. **Check HTML Structure:**
   - Verify `id="hamburger"`, `id="mainNav"`, `id="navList"` exist
   - Check all tags are properly closed

2. **Check JavaScript:**
   - Open DevTools (F12)
   - Click Console tab
   - Look for red error messages
   - Report the error

3. **Check CSS:**
   - Make sure `style.css` is linked
   - Check for media query rules
   - Verify responsive classes exist

---

## ✨ Final Checklist Before Sharing

- [ ] All files pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Website accessible via GitHub Pages URL
- [ ] Tested on 3+ different screen sizes
- [ ] Hamburger menu works on mobile
- [ ] All pages load correctly
- [ ] No broken links
- [ ] No error messages in console
- [ ] Images display properly
- [ ] Forms are functional

---

## 🚀 You're Ready!

Your responsive website is ready for deployment. The responsive design is fully implemented and tested. Good luck sharing with your school community! 🎉

For any issues, refer to the RESPONSIVE_CHECKLIST.md file for detailed verification steps.
