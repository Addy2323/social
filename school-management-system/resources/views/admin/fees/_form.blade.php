@csrf

<div class="mb-4">
    <label for="student_id" class="block text-gray-700 text-sm font-bold mb-2">Student</label>
    <select name="student_id" id="student_id" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="">Select a student</option>
        @foreach($students as $student)
            <option value="{{ $student->id }}" {{ old('student_id', $fee->student_id ?? '') == $student->id ? 'selected' : '' }}>
                {{ $student->user->name }}
            </option>
        @endforeach
    </select>
    @error('student_id')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="fee_type" class="block text-gray-700 text-sm font-bold mb-2">Fee Type</label>
    <input type="text" name="fee_type" id="fee_type" value="{{ old('fee_type', $fee->fee_type ?? '') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    @error('fee_type')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="amount" class="block text-gray-700 text-sm font-bold mb-2">Amount</label>
    <div class="flex">
        <div class="w-1/12">
            <span class="inline-block px-3 py-2 bg-gray-200 rounded-l text-gray-800">{{ config('app.currency_symbol') }}</span>
        </div>
        <input type="number" step="0.01" name="amount" id="amount" value="{{ old('amount', $fee->amount ?? '') }}" class="w-11/12 shadow appearance-none border rounded-r w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    @error('amount')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="due_date" class="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
    <input type="date" name="due_date" id="due_date" value="{{ old('due_date', $fee->due_date ? $fee->due_date->format('Y-m-d') : '') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    @error('due_date')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Status</label>
    <select name="status" id="status" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="unpaid" {{ old('status', $fee->status ?? 'unpaid') == 'unpaid' ? 'selected' : '' }}>Unpaid</option>
        <option value="paid" {{ old('status', $fee->status ?? 'unpaid') == 'paid' ? 'selected' : '' }}>Paid</option>
        <option value="partially_paid" {{ old('status', $fee->status ?? 'unpaid') == 'partially_paid' ? 'selected' : '' }}>Partially Paid</option>
    </select>
    @error('status')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="paid_date" class="block text-gray-700 text-sm font-bold mb-2">Paid Date</label>
    <input type="date" name="paid_date" id="paid_date" value="{{ old('paid_date', $fee->paid_date ? $fee->paid_date->format('Y-m-d') : '') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    @error('paid_date')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="payment_method" class="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
    <input type="text" name="payment_method" id="payment_method" value="{{ old('payment_method', $fee->payment_method ?? '') }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    @error('payment_method')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="mb-4">
    <label for="remarks" class="block text-gray-700 text-sm font-bold mb-2">Remarks</label>
    <textarea name="remarks" id="remarks" rows="3" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{{ old('remarks', $fee->remarks ?? '') }}</textarea>
    @error('remarks')
        <p class="text-red-500 text-xs italic">{{ $message }}</p>
    @enderror
</div>

<div class="flex items-center justify-between">
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Save Fee
    </button>
    <a href="{{ route('admin.fees.index') }}" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
        Cancel
    </a>
</div>
