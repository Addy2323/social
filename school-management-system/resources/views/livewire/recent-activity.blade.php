<div>
    <div class="space-y-4">
        @forelse ($activities as $activity)
            <div class="flex items-start">
                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div class="flex-1">
                    <p class="text-sm text-gray-900">New user registered: {{ $activity->name }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ $activity->created_at->diffForHumans() }}</p>
                </div>
            </div>
        @empty
            <p class="text-sm text-gray-500">No recent activity.</p>
        @endforelse
    </div>
</div>
