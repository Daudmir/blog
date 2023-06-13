<?php
/*
Plugin Name: Image Compressor
Description: A plugin that compresses images
Version: 1.0
Author: Daud
License: GPL2
*/

// tilføjer en handling
add_filter('wp_handle_upload_prefilter', 'simple_image_compressor_function');

function simple_image_compressor_function($file) {
    // kigger  om filen er uploadet
    $mime_type = $file['type'];
    $allowed_mime_types = array('image/jpeg', 'image/png', 'image/gif');
    $allowed_extensions = array('jpg', 'jpeg', 'png', 'gif');
    $file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (in_array($mime_type, $allowed_mime_types) && in_array($file_ext, $allowed_extensions)) {
        // tager filens path
        $file_path = $file['tmp_name'];

        // checker fil størrelse
        $file_size = filesize($file_path);
        $max_file_size = 5000000; // 5 MB
        if ($file_size > $max_file_size) {
            // kigger om filen er for stor og sletter
            unlink($file_path);
            return $file;
        }

        // compress billedet
        if ($mime_type == 'image/jpeg' || $mime_type == 'image/jpg') {
            $image = imagecreatefromjpeg($file_path);
            $quality = 80;
        } elseif ($mime_type == 'image/png') {
            $image = imagecreatefrompng($file_path);
            $quality = 9;
        } elseif ($mime_type == 'image/gif') {
            $image = imagecreatefromgif($file_path);
            $quality = 80;
        } else {
            $image = false;
        }

        if ($image) {
            // gemmer billedet
            if ($mime_type == 'image/jpeg' || $mime_type == 'image/jpg') {
                imagejpeg($image, $file_path, $quality);
            } elseif ($mime_type == 'image/png') {
                imagepng($image, $file_path, $quality);
            } elseif ($mime_type == 'image/gif') {
                imagegif($image, $file_path, $quality);
            }

            imagedestroy($image);

            // update
            $file_size = filesize($file_path);
            $file['size'] = $file_size;
            $file_path_rel = str_replace(wp_upload_dir()['basedir'], '', $file_path);
            $file['url'] = wp_upload_dir()['baseurl'] . $file_path_rel;
        } else {
            // slet hvis den fejler
            unlink($file_path);
        }
    }

    return $file;
}