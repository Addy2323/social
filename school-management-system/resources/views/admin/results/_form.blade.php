@if ($errors->any())
    <div class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
        <label for="student_id" class="block text-sm font-medium text-gray-700">Student</label>
        <select name="student_id" id="student_id" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            @foreach($students as $student)
                <option value="{{ $student->id }}" {{ (isset($result) && $result->student_id == $student->id) ? 'selected' : '' }}>
                    {{ $student->name }}
                </option>
            @endforeach
        </select>
    </div>
    <div>
        <label for="subject_id" class="block text-sm font-medium text-gray-700">Subject</label>
        <select name="subject_id" id="subject_id" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            @foreach($subjects as $subject)
                <option value="{{ $subject->id }}" {{ (isset($result) && $result->subject_id == $subject->id) ? 'selected' : '' }}>
                    {{ $subject->name }}
                </option>
            @endforeach
        </select>
    </div>
    <div>
        <label for="exam_type" class="block text-sm font-medium text-gray-700">Exam Type</label>
        <input type="text" name="exam_type" id="exam_type" value="{{ old('exam_type', $result->exam_type ?? '') }}" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
    </div>
    <div>
        <label for="exam_date" class="block text-sm font-medium text-gray-700">Exam Date</label>
        <input type="date" name="exam_date" id="exam_date" value="{{ old('exam_date', isset($result) ? $result->exam_date->format('Y-m-d') : '') }}" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
    </div>
    <div>
        <label for="marks_obtained" class="block text-sm font-medium text-gray-700">Marks Obtained</label>
        <input type="number" name="marks_obtained" id="marks_obtained" value="{{ old('marks_obtained', $result->marks_obtained ?? '') }}" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
    </div>
    <div>
        <label for="total_marks" class="block text-sm font-medium text-gray-700">Total Marks</label>
        <input type="number" name="total_marks" id="total_marks" value="{{ old('total_marks', $result->total_marks ?? '') }}" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
    </div>
</div>

<div class="mt-6">
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {{ isset($result) ? 'Update Result' : 'Add Result' }}
    </button>
    <a href="{{ route('admin.results.index') }}" class="ml-4 text-gray-600 hover:text-gray-900">Cancel</a>
</div>
