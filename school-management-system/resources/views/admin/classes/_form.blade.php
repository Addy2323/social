@csrf
<div class="space-y-6">
    <!-- Class Name -->
    <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Class Name</label>
        <input type="text" name="name" id="name" value="{{ old('name', $class->name ?? '') }}" required
               class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        @error('name')
            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>

    <!-- Section -->
    <div>
        <label for="section" class="block text-sm font-medium text-gray-700">Section</label>
        <input type="text" name="section" id="section" value="{{ old('section', $class->section ?? '') }}"
               class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        @error('section')
            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>

    <!-- Capacity -->
    <div>
        <label for="capacity" class="block text-sm font-medium text-gray-700">Capacity</label>
        <input type="number" name="capacity" id="capacity" value="{{ old('capacity', $class->capacity ?? '') }}" required
               class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        @error('capacity')
            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>

    <!-- Class Teacher -->
    <div>
        <label for="teacher_id" class="block text-sm font-medium text-gray-700">Class Teacher</label>
        <select name="teacher_id" id="teacher_id"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select a teacher</option>
            @foreach($teachers as $teacher)
                <option value="{{ $teacher->id }}" {{ (old('teacher_id', $class->teacher_id ?? '') == $teacher->id) ? 'selected' : '' }}>
                    {{ $teacher->user->name }}
                </option>
            @endforeach
        </select>
        @error('teacher_id')
            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>

    <!-- Description -->
    <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" id="description" rows="3"
                  class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{{ old('description', $class->description ?? '') }}</textarea>
        @error('description')
            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>

    <!-- Status -->
    <div>
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <select name="status" id="status" required
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="active" {{ (old('status', $class->status ?? '') == 'active') ? 'selected' : '' }}>Active</option>
            <option value="inactive" {{ (old('status', $class->status ?? '') == 'inactive') ? 'selected' : '' }}>Inactive</option>
        </select>
        @error('status')
            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
        @enderror
    </div>
</div>

<div class="mb-4">
    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Class Name</label>
    <input type="text" name="name" id="name" value="{{ old('name', $class->name ?? '') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    @error('name')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="section" class="block text-gray-700 text-sm font-bold mb-2">Section</label>
    <input type="text" name="section" id="section" value="{{ old('section', $class->section ?? '') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    @error('section')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="capacity" class="block text-gray-700 text-sm font-bold mb-2">Capacity</label>
    <input type="number" name="capacity" id="capacity" value="{{ old('capacity', $class->capacity ?? '') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    @error('capacity')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="teacher_id" class="block text-gray-700 text-sm font-bold mb-2">Class Teacher</label>
    <select name="teacher_id" id="teacher_id" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="">Select a teacher</option>
        @foreach($teachers as $teacher)
            <option value="{{ $teacher->id }}" {{ (isset($class) && $class->teacher_id == $teacher->id) ? 'selected' : '' }}>
                {{ $teacher->user->name }}
            </option>
        @endforeach
    </select>
    @error('teacher_id')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
    <textarea name="description" id="description" rows="3" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{{ old('description', $class->description ?? '') }}</textarea>
    @error('description')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Status</label>
    <select name="status" id="status" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="active" {{ (isset($class) && $class->status == 'active') ? 'selected' : '' }}>Active</option>
        <option value="inactive" {{ (isset($class) && $class->status == 'inactive') ? 'selected' : '' }}>Inactive</option>
    </select>
    @error('status')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="flex items-center justify-between">
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Save Class
    </button>
    <a href="{{ route('admin.classes.index') }}" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
        Cancel
    </a>
</div>
