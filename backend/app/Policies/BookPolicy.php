<?php

namespace App\Policies;

use App\Models\Book;
use App\Models\User;

class BookPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('catalog.view');
    }

    public function view(User $user, Book $book): bool
    {
        return $user->hasPermission('catalog.view');
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('catalog.create');
    }

    public function update(User $user, Book $book): bool
    {
        return $user->hasPermission('catalog.update');
    }

    public function delete(User $user, Book $book): bool
    {
        return $user->hasPermission('catalog.delete');
    }

    public function restore(User $user, Book $book): bool
    {
        return $user->hasPermission('catalog.restore');
    }
}
