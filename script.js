// USIU-Africa GPA Calculator
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('gpaForm');
    const courseInputs = document.getElementById('courseInputs');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const resultContainer = document.getElementById('resultContainer');
    const gpaDisplay = document.getElementById('gpaDisplay');
    
    let courseCount = 3; // Initial number of courses
    
    // Add event listener for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateGPA();
    });
    
    // Add event listener for "Add Another Course" button
    addCourseBtn.addEventListener('click', addCourseRow);
    
    /**
     * Calculates the GPA based on entered grades
     */
    function calculateGPA() {
        const gradeSelects = document.querySelectorAll('select[id^="grade"]');
        let totalPoints = 0;
        let validEntries = 0;
        let hasErrors = false;
        
        // Reset any previous error states
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        // Calculate total grade points
        gradeSelects.forEach(select => {
            const courseRow = select.closest('.course-row');
            const courseName = courseRow.querySelector('input[type="text"]');
            
            // Validate inputs
            if (!courseName.value.trim()) {
                courseName.classList.add('error');
                hasErrors = true;
            }
            
            if (!select.value) {
                select.classList.add('error');
                hasErrors = true;
            }
            
            // Only add to calculation if both fields are valid
            if (courseName.value.trim() && select.value) {
                totalPoints += parseFloat(select.value);
                validEntries++;
            }
        });
        
        if (hasErrors) {
            alert('Please fill in all course names and select grades for all courses.');
            return;
        }
        
        if (validEntries === 0) {
            gpaDisplay.textContent = '-';
            return;
        }
        
        // Calculate and display GPA
        const gpa = totalPoints / validEntries;
        gpaDisplay.textContent = gpa.toFixed(2);
        
        // Show result container if hidden
        resultContainer.style.display = 'block';
    }
    
    /**
     * Adds a new course row to the form
     */
    function addCourseRow() {
        courseCount++;
        
        const newRow = document.createElement('div');
        newRow.className = 'course-row';
        newRow.innerHTML = `
            <div class="input-group">
                <label for="course${courseCount}">Course ${courseCount}</label>
                <input type="text" id="course${courseCount}" placeholder="Enter course name" required>
            </div>
            <div class="input-group">
                <label for="grade${courseCount}">Grade</label>
                <select id="grade${courseCount}" required>
                    <option value="">Select grade</option>
                    <option value="4">A</option>
                    <option value="3">B</option>
                    <option value="2">C</option>
                    <option value="1">D</option>
                    <option value="0">F</option>
                </select>
            </div>
        `;
        
        courseInputs.appendChild(newRow);
    }
});
