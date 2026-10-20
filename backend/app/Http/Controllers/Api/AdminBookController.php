<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\IndexBookRequest;
use App\Http\Requests\Admin\StoreBookRequest;
use App\Http\Requests\Admin\UpdateBookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Services\Admin\BookAdminService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class AdminBookController extends Controller
{
    public function __construct(private readonly BookAdminService $books) {}

    public function index(IndexBookRequest $request)
    {
        Gate::authorize('viewAny', Book::class);

        return BookResource::collection($this->books->paginate($request->validated()));
    }

    public function store(StoreBookRequest $request): JsonResponse
    {
        Gate::authorize('create', Book::class);

        return (new BookResource($this->books->create($request->validated())))->response()->setStatusCode(201);
    }

    public function show(Book $book): BookResource
    {
        Gate::authorize('view', $book);

        return new BookResource($book->load(['category', 'images']));
    }

    public function update(UpdateBookRequest $request, Book $book): BookResource
    {
        Gate::authorize('update', $book);

        return new BookResource($this->books->update($book, $request->validated()));
    }

    public function destroy(Book $book): JsonResponse
    {
        Gate::authorize('delete', $book);
        $this->books->delete($book);

        return response()->json([], 204);
    }

    public function restore(int $book): BookResource
    {
        $book = Book::withTrashed()->findOrFail($book);
        Gate::authorize('restore', $book);

        return new BookResource($this->books->restore($book));
    }
}
