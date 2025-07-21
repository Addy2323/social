<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::with('creator')->latest()->paginate(10);
        $stats = [
            'total' => Announcement::count(),
            'published' => Announcement::where('status', 'published')->count(),
            'drafts' => Announcement::where('status', 'draft')->count(),
            'urgent' => Announcement::where('priority', 'urgent')->count(),
        ];
        
        return view('admin.announcements.index', compact('announcements', 'stats'));
    }

    public function create()
    {
        return view('admin.announcements.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'priority' => 'required|in:low,medium,high,urgent',
            'target_audience' => 'required|in:all,students,teachers,parents',
            'status' => 'required|in:draft,published,archived',
            'publish_date' => 'nullable|date',
            'expiry_date' => 'nullable|date|after:publish_date',
        ]);

        $announcement = Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'priority' => $request->priority,
            'target_audience' => $request->target_audience,
            'status' => $request->status,
            'created_by' => auth()->id(),
            'publish_date' => $request->publish_date,
            'expiry_date' => $request->expiry_date,
        ]);

        return redirect()->route('admin.announcements.index')->with('success', 'Announcement created successfully.');
    }

    public function show(Announcement $announcement)
    {
        $announcement->load('creator');
        return view('admin.announcements.show', compact('announcement'));
    }

    public function edit(Announcement $announcement)
    {
        return view('admin.announcements.edit', compact('announcement'));
    }

    public function update(Request $request, Announcement $announcement)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'priority' => 'required|in:low,medium,high,urgent',
            'target_audience' => 'required|in:all,students,teachers,parents',
            'status' => 'required|in:draft,published,archived',
            'publish_date' => 'nullable|date',
            'expiry_date' => 'nullable|date|after:publish_date',
        ]);

        $announcement->update([
            'title' => $request->title,
            'content' => $request->content,
            'priority' => $request->priority,
            'target_audience' => $request->target_audience,
            'status' => $request->status,
            'publish_date' => $request->publish_date,
            'expiry_date' => $request->expiry_date,
        ]);

        return redirect()->route('admin.announcements.index')->with('success', 'Announcement updated successfully.');
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();
        return redirect()->route('admin.announcements.index')->with('success', 'Announcement deleted successfully.');
    }
}
