<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\FeeController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\ExportController;
use App\Http\Controllers\Admin\SettingController;

// Public routes
Route::get('/', function () {
    return view('welcome');
})->name('home');

// Authentication Routes
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register']);

// Protected routes
Route::middleware(['auth'])->group(function () {
    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Admin routes
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'adminDashboard'])->name('dashboard');
        // User Management
        Route::resource('users', UserController::class);
        Route::resource('students', StudentController::class);
        Route::resource('teachers', TeacherController::class);
        Route::resource('parents', ParentController::class);
        Route::resource('classes', ClassController::class);
        Route::resource('fees', FeeController::class);
        Route::resource('announcements', AnnouncementController::class);
        Route::resource('attendance', AttendanceController::class);
        Route::resource('results', ResultController::class);
        Route::resource('rankings', RankingController::class);
        Route::resource('payments', PaymentController::class);

        // New Admin Pages
        Route::get('messages', [MessageController::class, 'index'])->name('messages.index');
        Route::get('notifications', [NotificationController::class, 'index'])->name('notifications.index');
        Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('analytics', [AnalyticsController::class, 'index'])->name('analytics.index');
        Route::get('export', [ExportController::class, 'index'])->name('export.index');
        Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
        Route::post('settings/general', [SettingController::class, 'updateGeneral'])->name('settings.update.general');
        Route::post('settings/profile', [SettingController::class, 'updateProfile'])->name('settings.update.profile');
        Route::post('settings/password', [SettingController::class, 'updatePassword'])->name('settings.update.password');
    });
    
    // Teacher routes
    Route::middleware(['role:teacher'])->prefix('teacher')->name('teacher.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'teacherDashboard'])->name('dashboard');
        Route::get('/classes', [TeacherController::class, 'myClasses'])->name('classes.index');
        Route::get('/students', [StudentController::class, 'teacherStudents'])->name('students');
        Route::get('/attendance', [StudentController::class, 'attendance'])->name('attendance');
        Route::post('/attendance', [StudentController::class, 'storeAttendance'])->name('attendance.store');
    });
    
    // Student routes
    Route::middleware(['role:student'])->prefix('student')->name('student.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'studentDashboard'])->name('dashboard');
        Route::get('/grades', [StudentController::class, 'grades'])->name('grades');
        Route::get('/attendance', [StudentController::class, 'studentAttendance'])->name('attendance');
    });
    
    // Parent routes
    Route::middleware(['role:parent'])->prefix('parent')->name('parent.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'parentDashboard'])->name('dashboard');
        Route::get('/children', [ParentController::class, 'children'])->name('children');
        Route::get('/child/{student}/grades', [ParentController::class, 'childGrades'])->name('child.grades');
        Route::get('/child/{student}/attendance', [ParentController::class, 'childAttendance'])->name('child.attendance');
    });
});

// Role-specific dashboard routes are now handled by the main dashboard route

/*
|--------------------------------------------------------------------------
| Placeholder Routes
|--------------------------------------------------------------------------
|
| These routes are for features that are not yet implemented. They all
| point to a placeholder page to prevent "Route not defined" errors.
|
*/
use App\Http\Controllers\PlaceholderController;

// Admin placeholder routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::resource('students', \App\Http\Controllers\Admin\StudentController::class)->names('admin.students');
    Route::resource('teachers', \App\Http\Controllers\Admin\TeacherController::class)->names('admin.teachers');
    Route::resource('parents', \App\Http\Controllers\Admin\ParentController::class)->names('admin.parents');
    Route::resource('fee-types', \App\Http\Controllers\Admin\FeeTypeController::class)->names('admin.fee-types');
    Route::get('/messages', [\App\Http\Controllers\PlaceholderController::class, 'index'])->name('admin.messages.index');
    Route::get('/notifications', [\App\Http\Controllers\PlaceholderController::class, 'index'])->name('admin.notifications.index');
    Route::get('/reports', [\App\Http\Controllers\PlaceholderController::class, 'index'])->name('admin.reports.index');
    Route::get('/analytics', [\App\Http\Controllers\PlaceholderController::class, 'index'])->name('admin.analytics.index');
    Route::get('/export', [\App\Http\Controllers\PlaceholderController::class, 'index'])->name('admin.export.index');
});
